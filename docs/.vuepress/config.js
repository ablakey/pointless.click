const fs = require("fs");
const matter = require("gray-matter");

function getMonthNumber(monthName) {
  return new Date(Date.parse(monthName + " 1, 2020")).getMonth();
}

/**
 * Walk all project markdown files, get their date, and assemble sidebar metadata for Vuepress to create links.
 */
const metadata = fs.readdirSync(__dirname + "/../projects/").map((filename) => {
  const file = matter(
    fs.readFileSync(__dirname + "/../projects/" + filename, "utf8")
  );

  // Read frontmatter of each file, getting month, year.
  try {
    const [month, day, year] = file.data.date.split(" "); // TODO: Should parse as a Date object instead.
    return {
      filename,
      day,
      month,
      year,
    };
  } catch {
    console.error(`${filename} has invalid markdown frontmatter.`);
    process.exit(1); // Don't allow partially valid builds.
  }
});

const yearGroups = metadata
  .filter((m) => m !== undefined) // Filter any markdown files that didn't have a date.
  .sort((a, b) => b.day - a.day) // Sort by day.
  .sort((a, b) => getMonthNumber(b.month) - getMonthNumber(a.month)) // Sort by month.
  .reduce((acc, m) => {
    // Group into lists keyed by year number.
    const yearList = acc[m.year] || [];
    yearList.push(m);
    acc[m.year] = yearList;
    return acc;
  }, {});

const projectsChildren = Object.entries(yearGroups)
  .map(([year, m]) => {
    // Convert metadata entries into Vuepress themeConfig.sidebar.children format.
    return {
      title: year,
      children: m.map((e) => `/projects/${e.filename}`),
      sidebarDepth: 0,
    };
  })
  .sort((a, b) => b.title - a.title); // Reverse order the year.

/**
 * Configuration for webpage.
 */
module.exports = {
  title: "Today's Pointless Click",
  themeConfig: {
    sidebar: [
      {
        title: "Games",
        path: "/games",
        sidebarDepth: 0,
        collapsable: false,
        children: ["projects/the_state_machine.md", "projects/lights_out.md"],
      },
      {
        title: "Projects",
        path: "/projects",
        collapsable: false,
        sidebarDepth: 1,
        children: projectsChildren,
      },
      "/about",
    ],
  },
};
