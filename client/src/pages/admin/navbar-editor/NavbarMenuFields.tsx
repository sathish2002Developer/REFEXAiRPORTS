import type { NavChild, NavGroup, NavItem, NavItemType } from "@/lib/cmsNavbar";
import { emptyNavItem } from "@/lib/cmsNavbar";
import { adminToast } from "@/lib/adminToast";

const inputCls =
  "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]";
const labelCls = "block text-xs font-semibold text-slate-600 mb-1";

const TYPE_OPTIONS: { id: NavItemType; label: string }[] = [
  { id: "link", label: "Link" },
  { id: "dropdown", label: "Dropdown" },
  { id: "nested", label: "Nested (groups)" },
  { id: "anchor", label: "Scroll / hash" },
];

export default function NavbarMenuFields({
  items,
  onChange,
}: {
  items: NavItem[];
  onChange: (next: NavItem[]) => void;
}) {
  const update = (index: number, patch: Partial<NavItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const changeType = (index: number, type: NavItemType) => {
    const item = items[index];
    const next: NavItem = { type, label: item.label, to: item.to };
    if (type === "dropdown") next.children = item.children || [];
    if (type === "nested") next.groups = item.groups || [];
    onChange(items.map((row, i) => (i === index ? next : row)));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          Menus
          <span className="ml-2 text-xs font-normal text-slate-400">{items.length} items</span>
        </p>
        <button
          type="button"
          onClick={() => {
            onChange([...items, emptyNavItem("link")]);
            adminToast.added();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
        >
          <i className="ri-add-line"></i>
          Add menu
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
          No menus yet. Click Add menu to create one.
        </p>
      )}

      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-800 truncate">
              {index + 1}. {item.label || "Untitled"}
              <span className="ml-2 text-xs font-normal text-slate-400">{item.type}</span>
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} className="text-slate-500 cursor-pointer text-sm">
                <i className="ri-arrow-up-s-line"></i>
              </button>
              <button type="button" onClick={() => move(index, 1)} className="text-slate-500 cursor-pointer text-sm">
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(items.filter((_, i) => i !== index));
                  adminToast.deleted();
                }}
                className="text-xs font-medium text-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Menu name</label>
                <input className={inputCls} value={item.label} onChange={(e) => update(index, { label: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select
                  className={inputCls}
                  value={item.type}
                  onChange={(e) => changeType(index, e.target.value as NavItemType)}
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>{item.type === "anchor" ? "Hash / URL" : "URL"}</label>
                <input
                  className={inputCls}
                  value={item.to}
                  placeholder={item.type === "anchor" ? "#contact" : "/about"}
                  onChange={(e) => update(index, { to: e.target.value })}
                />
              </div>
            </div>

            {item.type === "dropdown" && (
              <ChildrenEditor
                childrenItems={item.children || []}
                onChange={(children) => update(index, { children })}
              />
            )}

            {item.type === "nested" && (
              <GroupsEditor groups={item.groups || []} onChange={(groups) => update(index, { groups })} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChildrenEditor({
  childrenItems,
  onChange,
}: {
  childrenItems: NavChild[];
  onChange: (next: NavChild[]) => void;
}) {
  const update = (i: number, patch: Partial<NavChild>) => {
    onChange(childrenItems.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-2 border border-slate-100 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600">Dropdown items</p>
        <button
          type="button"
          onClick={() => {
            onChange([...childrenItems, { label: "", to: "" }]);
            adminToast.added();
          }}
          className="text-xs font-medium text-[#2879b1] cursor-pointer"
        >
          Add item
        </button>
      </div>
      {childrenItems.map((child, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
          <input className={inputCls} placeholder="Name" value={child.label} onChange={(e) => update(i, { label: e.target.value })} />
          <input className={inputCls} placeholder="/path" value={child.to} onChange={(e) => update(i, { to: e.target.value })} />
          <button
            type="button"
            onClick={() => {
              onChange(childrenItems.filter((_, n) => n !== i));
              adminToast.deleted();
            }}
            className="text-xs text-red-600 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function GroupsEditor({
  groups,
  onChange,
}: {
  groups: NavGroup[];
  onChange: (next: NavGroup[]) => void;
}) {
  const updateGroup = (i: number, patch: Partial<NavGroup>) => {
    onChange(groups.map((row, n) => (n === i ? { ...row, ...patch } : row)));
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600">Nested groups (e.g. Retail, Lounge)</p>
        <button
          type="button"
          onClick={() => {
            onChange([...groups, { label: "New group", children: [] }]);
            adminToast.added();
          }}
          className="text-xs font-medium text-[#2879b1] cursor-pointer"
        >
          Add group
        </button>
      </div>
      {groups.map((group, gi) => (
        <div key={gi} className="border border-slate-100 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <input className={inputCls} placeholder="Group name" value={group.label} onChange={(e) => updateGroup(gi, { label: e.target.value })} />
            <button
              type="button"
              onClick={() => {
                onChange(groups.filter((_, n) => n !== gi));
                adminToast.deleted();
              }}
              className="text-xs text-red-600 cursor-pointer whitespace-nowrap"
            >
              Delete group
            </button>
          </div>
          <ChildrenEditor
            childrenItems={group.children || []}
            onChange={(children) => updateGroup(gi, { children })}
          />
        </div>
      ))}
    </div>
  );
}
