import { j as jsxRuntimeExports, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { P as PuppyListingForm } from "./PuppyListingForm-CUjEMPgm.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { D as DashboardLayout } from "./DashboardLayout-T7nYCU5z.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "assert";
import "tty";
import "os";
import "zlib";
import "events";
import "process";
import "./TextInput-CTPfMhdJ.js";
import "./InputLabel-DAgP54zY.js";
import "./SelectInput-CKQ7NZN0.js";
import "./react-select.esm-tWlRM8_L.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./GenericFileUpload-BR4QEQmv.js";
import "./index-BJOsIyUP.js";
import "./MapInput-Bo1DSz82.js";
import "./Button-C_TFTgI3.js";
import "./InputError-BrGvvBAw.js";
import "./lodash-CtkUkZej.js";
import "./Layout-CVJc5AuP.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Edit = ({ url, puppy_edit }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "My Puppies", metaTitle: "Edit Puppy Listing", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Edit Puppy Listing", url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        { label: "My Puppies", link: "/profile?tab=My Puppies" },
        { label: "Edit Listing", link: "#" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "Edit your puppy listing", description: "Update your puppy listing information." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyListingForm, { puppy_edit })
    ] })
  ] });
};
export {
  Edit as default
};
