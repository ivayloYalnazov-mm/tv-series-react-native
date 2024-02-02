const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export { stripHtml };
