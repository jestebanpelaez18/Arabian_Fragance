import { Fragment, type ReactNode } from "react";

type RichTextNode = {
  type?: string;
  value?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  title?: string;
  level?: number;
  listType?: string;
  children?: RichTextNode[];
};

function renderNode(node: RichTextNode, key: string): ReactNode {
  const children = node.children?.map((child, index) =>
    renderNode(child, `${key}-${index}`),
  );

  switch (node.type) {
    case "root":
      return <Fragment key={key}>{children}</Fragment>;

    case "text": {
      let text: ReactNode = node.value ?? "";

      if (node.bold) {
        text = <strong className="font-semibold">{text}</strong>;
      }

      if (node.italic) {
        text = <em>{text}</em>;
      }

      return <Fragment key={key}>{text}</Fragment>;
    }

    case "paragraph":
      return (
        <p key={key} className="whitespace-pre-line">
          {children}
        </p>
      );

    case "heading":
      return (
        <p key={key} className="font-semibold">
          {children}
        </p>
      );

    case "list":
      return node.listType === "ordered" ? (
        <ol key={key} className="list-decimal space-y-2 pl-5">
          {children}
        </ol>
      ) : (
        <ul key={key} className="list-disc space-y-2 pl-5">
          {children}
        </ul>
      );

    case "list-item":
      return <li key={key}>{children}</li>;

    case "link": {
      const url = node.url?.trim();

      const isAllowed =
        url &&
        (/^https?:\/\//i.test(url) ||
          /^mailto:/i.test(url) ||
          (url.startsWith("/") && !url.startsWith("//")) ||
          url.startsWith("#"));

      if (!isAllowed) {
        return <Fragment key={key}>{children}</Fragment>;
      }

      return (
        <a
          key={key}
          href={url}
          title={node.title}
          className="hover:text-gold underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    }

    default:
      return <Fragment key={key}>{children ?? node.value ?? null}</Fragment>;
  }
}

export default function ShopifyRichText({ value }: { value?: string | null }) {
  if (!value?.trim()) return null;

  let document: RichTextNode | null = null;

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      parsed &&
      typeof parsed === "object" &&
      "type" in parsed &&
      parsed.type === "root"
    ) {
      document = parsed as RichTextNode;
    }
  } catch {
    // Plain text is also supported in case the field format changes.
  }

  return (
    <div className="space-y-3">
      {document ? (
        renderNode(document, "root")
      ) : (
        <p className="whitespace-pre-line">{value}</p>
      )}
    </div>
  );
}
