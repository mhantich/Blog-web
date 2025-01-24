"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserCircle } from "lucide-react";

interface LikesProps {
  likes: any[];
}

function Likes({ likes }: LikesProps) {
  const [open, setOpen] = useState(false);
  // console.log(likes);

  return (
    <div>

   <p></p>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {likes?.length || 0} likes
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Liked by</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {likes?.length === 0 ? (
            <p className="text-muted-foreground text-center">No likes yet</p>
          ) : (
            likes?.map((like) => (
              <div
                key={like._id}
                className="flex items-center gap-3 py-2 border-b last:border-b-0"
              >
                <UserCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{like.user_id.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
    </div>
  );
}

export default Likes;