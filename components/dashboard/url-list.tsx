"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Loader2, Copy, Check } from "lucide-react";
import type { UrlData } from "./dashboard";
import { useRouter } from "next/navigation";

interface UrlListProps {
  onSelectUrl: (url: UrlData) => void;
  onUrlDeleted: () => void;
}

export function UrlList({ onSelectUrl, onUrlDeleted }: UrlListProps) {
  const router = useRouter()
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchUrls = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/get-all-urls`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if(!response.ok && response.status == 403) router.push("/login");
      if (!response.ok) throw new Error("Failed to fetch URLs");
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);

    try {
      const response = await fetch(`/dashboard/delete/${id}`, {
        method: "DELETE",
      });
      if(!response.ok && response.status == 403) router.push("/login");
      if (!response.ok) throw new Error("Failed to delete URL");
      setUrls((prev) => prev.filter((url) => url.id !== id));
      onUrlDeleted();
    } catch (error) {
      console.error("Error deleting URL:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (
    shortUrl: string,
    id: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your URLs</CardTitle>
        <CardDescription>
          {urls.length} {urls.length === 1 ? "URL" : "URLs"} created
        </CardDescription>
      </CardHeader>
      <CardContent>
        {urls.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No URLs yet. Create your first short URL above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {urls.map((url) => (
              <div
                key={url.id}
                onClick={() => onSelectUrl(url)}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-black text-foreground truncate">
                      {url.shorturl}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 cursor-pointer "
                      onClick={(e) => handleCopy(url.shorturl, url.id, e)}
                    >
                      {copiedId === url.id ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {` [ ${url.longurl.slice(0, 50)} . . . ] `}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(url.longurl, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDelete(url.id, e)}
                    disabled={deletingId === url.id}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    {deletingId === url.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
