import { apiRequest } from "./api";

const seedOrganizations = [
  { id: "org-1", name: "Community Kitchen Colombo", type: "Community kitchen", contactPerson: "Nadeesha Perera", email: "hello@communitykitchen.lk", phone: "+94 77 234 1188", address: "18 Temple Road, Colombo 03", status: "Active" },
  { id: "org-2", name: "The Green Table", type: "Charity", contactPerson: "Ahamed Rizvi", email: "team@greentable.lk", phone: "+94 71 822 4091", address: "42 Park Street, Kandy", status: "Active" },
  { id: "org-3", name: "Hope Harvest Network", type: "Non-profit", contactPerson: "Shanika Silva", email: "connect@hopeharvest.org", phone: "+94 76 519 2830", address: "7 Station Lane, Galle", status: "Paused" }
];

const toApiValues = (values) => ({ ...values, phone: values.phone.replace(/[\s-]/g, "") });

export function readOrganizations() { return apiRequest("/organizations"); }
export function createOrganization(values) { return apiRequest("/organizations", { method: "POST", body: JSON.stringify(toApiValues(values)) }); }
export function updateOrganization(id, values) { return apiRequest(`/organizations/${id}`, { method: "PUT", body: JSON.stringify(toApiValues(values)) }); }
export function deleteOrganization(id) { return apiRequest(`/organizations/${id}`, { method: "DELETE" }); }
