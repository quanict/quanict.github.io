import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[tag]));
}

export function markdownParser(markdown) {
  let html = markdown

  // Headings
  html = html.replace(/^(#{1,3})\s+(.+)$/gm, (_, level, content) => {
    level = level.length;
    return `<h${level}>${escapeHTML(content)}</h${level}>`;
  });

  // Bold
  html = html.replace(/(?:\*\*|__)(.+?)(?:\*\*|__)/gm, (_, content) => {
    return `<span class="font-bold">${escapeHTML(content)}</span>`;
  });

  // Italic
  html = html.replace(/(?:\*|_)(.+?)(?:\*|_)/gm, (_, content) => {
    return `<em>${escapeHTML(content)}</em>`;
  });

  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/gm, (_, alt, src) => {
    return `<img alt="${escapeHTML(alt)}" src="${escapeHTML(src)}">`;
  });

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/gm, (_, text, href) => {
    return `<a href="${escapeHTML(href)}">${escapeHTML(text)}</a>`;
  });

  // Blockquotes
  html = html.replace(/^>\s*(.+)/gm, (_, content) => {
    return `<blockquote>${escapeHTML(content)}</blockquote>`;
  });

  // Wrap remaining lines in <p>
  html = html
    .split('\n')
    .map(line => {
      line = line.trim();
      if (
        line === '' ||
        /^<\/?(h\d|blockquote|img|a|span|em|code)/.test(line)
      ) {
        return line;
      }
      return `<p>${line}</p>`;
    })
    .join('\n');

  return html.trim()
}
