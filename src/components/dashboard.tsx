"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FileInfo } from "@/types";
import StorageMeter from "./storage-meter";
import FileList from "./file-list";
import FileUploadButton from "./file-upload";
import { Skeleton } from "./ui/skeleton";

const USER_STORAGE_LIMIT = 2 * 1024 * 1024 * 1024; // 2GB

export default function Dashboard() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, "files"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userFiles: FileInfo[] = [];
      querySnapshot.forEach((doc) => {
        userFiles.push({ id: doc.id, ...doc.data() } as FileInfo);
      });
      // Manually sort by createdAt client-side
      userFiles.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setFiles(userFiles);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return null;
  }

  const storageUsed = user.storageUsed || 0;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Files</h1>
          <p className="text-muted-foreground">
            Manage your uploaded files here.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StorageMeter
            storageUsed={storageUsed}
            storageLimit={USER_STORAGE_LIMIT}
          />
          <FileUploadButton
            storageUsed={storageUsed}
            storageLimit={USER_STORAGE_LIMIT}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="rounded-lg border">
            <div className="w-full text-sm">
                <div className="border-b">
                    <div className="flex h-12 items-center px-4">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/6 ml-auto" />
                        <Skeleton className="h-4 w-1/6 ml-8" />
                        <Skeleton className="h-4 w-12 ml-8" />
                    </div>
                </div>
                <div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border-b">
                            <div className="flex h-12 items-center px-4">
                                <Skeleton className="h-6 w-6 mr-4 rounded" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-1/6 ml-auto" />
                                <Skeleton className="h-4 w-1/6 ml-8" />
                                <Skeleton className="h-4 w-8 ml-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      ) : (
        <FileList files={files} />
      )}
    </div>
  );
}
