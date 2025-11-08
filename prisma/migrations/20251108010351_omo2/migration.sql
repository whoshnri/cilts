-- CreateTable
CREATE TABLE "_UserUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Collab" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserUpvotes_AB_unique" ON "_UserUpvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserUpvotes_B_index" ON "_UserUpvotes"("B");
