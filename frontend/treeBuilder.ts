import { RepoNode } from "./types";

export function buildTreeFromFlat(files: any[]): RepoNode {
  const root: RepoNode = {
    name: "repo",
    type: "directory",
    children: [],
  };

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    parts.forEach((part: string, index: number) => {
      if (!current.children) current.children = [];

      let existing = current.children.find(c => c.name === part);

      if (!existing) {
        existing = {
          name: part,
          type:
            index === parts.length - 1
              ? file.type === "blob"
                ? "file"
                : "directory"
              : "directory",
          children: [],
        };

        current.children.push(existing);
      }

      current = existing;
    });
  }

  return root;
}
