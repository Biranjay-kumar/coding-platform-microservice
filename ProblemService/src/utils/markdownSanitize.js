const { marked } = require("marked");
const sanitizeHtmlLibrary = require("sanitize-html");
const TurndownService = require("turndown");

function sanitizeMarkdownContent(markedContent) {
  const turnDownService = new TurndownService();

  //first convert the markdown into html
  const convertedHtml = marked.parse(markedContent);
  console.log("converted HTML",convertedHtml)

  //now sanitize the html

  const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml, {
    allowedTags: sanitizeHtmlLibrary.defaults.allowedTags.concat(['img']),
  });

  console.log("sanitized HTML",sanitizedHtml);

  //3.convert the sanitized html into again markdown
  const sanitizedMarkdown = turnDownService.turndown(sanitizedHtml);
  console.log("converted markdown",sanitizedMarkdown)
  return sanitizedMarkdown;
}

module.exports = sanitizeMarkdownContent;
