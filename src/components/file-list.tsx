"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Download,
  Trash2,
  File as FileIcon,
  FileText,
  ImageIcon,
  FileVideo,
  FileAudio,
  Archive,
  FolderArchive
} from "lucide-react";
import { FileInfo } from "@/types";
import { formatBytes } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";

interface FileListProps {
  files: FileInfo[];
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
  if (fileType.startsWith("video/")) return <FileVideo className="h-5 w-5 text-muted-foreground" />;
  if (fileType.startsWith("audio/")) return <FileAudio className="h-5 w-5 text-muted-foreground" />;
  if (fileType.startsWith("text/")) return <FileText className="h-5 w-5 text-muted-foreground" />;
  if (fileType.includes("zip") || fileType.includes("archive")) return <Archive className="h-5 w-5 text-muted-foreground" />;
  return <FileIcon className="h-5 w-5 text-muted-foreground" />;
};

export default function FileList({ files }: FileListProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDelete = async (file: FileInfo) => {
    if (!user) return;
    
    const fileRef = ref(storage, file.path);
    const fileDocRef = doc(db, "files", file.id);
    const userDocRef = doc(db, "users", user.uid);

    try {
      await deleteObject(fileRef);
      await deleteDoc(fileDocRef);
      const newStorageUsed = Math.max(0, (user.storageUsed || 0) - file.size);
      await updateDoc(userDocRef, { storageUsed: newStorageUsed });

      toast({
        title: "Success",
        description: `"${file.name}" has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the file. Please try again.",
      });
    }
  };

  if (files.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FolderArchive className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No files uploaded</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Get started by uploading your first file.
            </p>
        </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell w-[150px] text-right">Size</TableHead>
            <TableHead className="hidden md:table-cell w-[200px] text-right">Date Added</TableHead>
            <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">{formatBytes(file.size)}</TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {new Date(file.createdAt.seconds * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={file.downloadURL} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(file)} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
