"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "@/hooks/useRouter";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  X,
  FileText,
  CheckCircle2,
  PencilLine,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import Image from "next/image";
import { formatId } from "@/lib/format-id";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { DeleteModel } from "@/components/reusable/DeleteModel";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Blog {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  status: string;
  created_at: string;
  updated_at: string;
  coverImage?: string;
  coverImageAlt?: string;
}

/* =========================
   HIGHLIGHT HELPER
========================= */
const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safeQuery})`, "gi");
  const lowerQuery = query.toLowerCase();

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === lowerQuery ? (
      <span key={i} className="bg-yellow-200 text-black rounded">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export default function BlogsPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(
    () => ({
      total: blogs.length,
      published: blogs.filter((b) => b.status === "published").length,
      draft: blogs.filter((b) => b.status === "draft").length,
    }),
    [blogs],
  );

  /* =========================
     DELETE MODAL STATE
  ========================== */
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (dateRange?.from) {
        queryParams.append("from_date", format(dateRange.from, "yyyy-MM-dd"));
      }
      if (dateRange?.to) {
        queryParams.append("to_date", format(dateRange.to, "yyyy-MM-dd"));
      }
      if (statusFilter && statusFilter !== "all") {
        queryParams.append("status", statusFilter);
      }

      const res = await fetch(
        `/api/blogs?${queryParams.toString()}`,
        { credentials: "include" }
      );
      const data = await res.json();

      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, statusFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleStatusChange = useCallback(async (slug: string, newStatus: string) => {
    try {
      const res = await fetch(
        `/api/blogs/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        },
      );

      if (res.ok) {
        toast.success(`Status updated to ${newStatus}`);
        fetchBlogs(); // Refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Something went wrong");
    }
  }, [fetchBlogs]);

  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(q) ||
        blog.slug?.toLowerCase().includes(q) ||
        blog.status?.toLowerCase().includes(q) ||
        formatId(blog.id).toLowerCase().includes(q) ||
        `#${formatId(blog.id).toLowerCase()}`.includes(q),
    );
  }, [search, blogs]);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID", sortable: true, render: (v: any) => <span>#{formatId(v)}</span> },

    {
      key: "image",
      label: "Image",
      sortable: false,
      render: (_value: any, row: Blog, openModal: any) => {
        return (
          <Image
            src={row.coverImage || "/image_not_found.webp"}
            alt={row.coverImageAlt || ""}
            className="w-15 h-15 object-cover rounded-md cursor-pointer"
            unoptimized
            width={60}
            height={60}
            onClick={(e) => {
              e.stopPropagation();
              openModal(row.coverImage!, row.coverImageAlt || "");
            }}
          />
        );
      },
    },

    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value: any) => <span>{highlightText(String(value), search)}</span>,
    },

    {
      key: "slug",
      label: "Slug",
      render: (value: any) => (
        <span className="text-muted-foreground">
          /{highlightText(String(value), search)}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (value: any, row: Blog) => {
        const status = String(value).toLowerCase();

        return (
          <Select
            value={status}
            onValueChange={(newStatus) =>
              handleStatusChange(row.slug, newStatus)
            }
          >
            <SelectTrigger
              className={`w-28 ${
                status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-foreground"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Blog Status</SelectLabel>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },

    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      render: (value: any) => format(new Date(value), "dd MMM yyyy"),
    },

    {
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      render: (value: any) =>
        value ? format(new Date(value), "dd MMM yyyy, HH:mm") : "-",
    },

    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_value: any, row: Blog) => (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => router.push(`/admin/blogs/edit/${row.slug}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-red-600"
                  onClick={() => {
                    setSelectedId(row.id);
                    setDeleteOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    ],
    [search, handleStatusChange, router],
  );

  /* =========================
     DELETE BLOG
  ========================== */
  const handleDelete = async () => {
    if (!selectedId) return;

    setLoadingDelete(true);

    try {
      await fetch(
        `/api/blogs/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const updated = blogs.filter((b) => b.id !== selectedId);
      setBlogs(updated);

      setDeleteOpen(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Failed to delete blog:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blogs</h1>
            <p className="text-muted-foreground">Manage your blog posts</p>
          </div>

          <Button onClick={() => router.push("/admin/blogs/create")}>
            Add Blog
          </Button>
        </div>

        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Total Blogs */}
          <Card className="relative overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Blogs
              </CardTitle>
              <FileText className="h-5 w-5 text-blue-500" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats.total}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All time posts
              </p>
            </CardContent>
          </Card>

          {/* Published */}
          <Card className="relative overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.published}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Live articles
              </p>
            </CardContent>
          </Card>

          {/* Draft */}
          <Card className="relative overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Drafts
              </CardTitle>
              <PencilLine className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold text-gray-700">
                {stats.draft}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Work in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <InputGroup className="flex-1">
            <InputGroupAddon>
              <Search className="h-4 w-4 text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupInput
              placeholder="Search by title, slug or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter by Status</SelectLabel>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[260px] justify-start px-2.5 font-normal text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} –{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range: DateRange | undefined) => {
                    setDateRange(range);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {dateRange && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDateRange(undefined)}
                title="Clear date filter"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* TABLE */}
        {isLoading ? (
          <div className="rounded-lg border bg-card p-6 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <DataTable lastColumnSticky columns={columns} data={filteredBlogs} />
        )}

        {/* DELETE MODAL */}
        <DeleteModel
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete Blog"
          description="This action cannot be undone. The blog will be permanently removed."
          onDelete={handleDelete}
          loading={loadingDelete}
          acceptLabel="I understand this will permanently delete the blog"
          confirmLabel="Delete"
        />
      </div>
    </AdminLayout>
  );
}
