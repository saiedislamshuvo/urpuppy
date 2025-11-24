import { j as jsxRuntimeExports, a as je } from "../ssr.js";
import { B as Breadcrumb } from "./Breadcrumb-D8nxHqVE.js";
import { P as PuppyListingForm } from "./PuppyListingForm-f4tdVCW9.js";
import { H as Heading } from "./Heading-vwwW7yNV.js";
import { M as MetaTags } from "./MetaTags-D4JDM_I7.js";
import { D as DashboardLayout } from "./DashboardLayout-gPtbtbBl.js";
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
import "./SelectInput-BE0JG6ya.js";
import "./index-Cs9ZHUfq.js";
import "./setPrototypeOf-DxvfjWzF.js";
import "./extends-BwmuZ0dU.js";
import "./hoist-non-react-statics.cjs-BnF7CivY.js";
import "./index-DgY4nH2N.js";
import "./index-D7h8hQJR.js";
import "./floating-ui.dom-CzygHDtM.js";
import "./GenericFileUpload-CnL5n1ZT.js";
import "./index-BQVxnAyW.js";
import "./MapInput-UCdFIrt9.js";
import "./Button-C_TFTgI3.js";
import "./InputError-BrGvvBAw.js";
import "./lodash-CtkUkZej.js";
import "./Layout-DdG4gm-d.js";
import "./Avatar-Bsv7zAP7.js";
import "./index-DzrIk5T7.js";
const Create = ({ url }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { activeTab: "My Puppies", metaTitle: "Create Puppy Listing", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { title: "Create Puppy Listing", url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { links: [
        { label: "My Puppies", link: "/profile?tab=My Puppies" },
        { label: "Create Listing", link: "#" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: "List your puppy", description: "Create a new listing for your puppy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PuppyListingForm, { puppy_edit: null })
    ] })
  ] });
};
export {
  Create as default
};
