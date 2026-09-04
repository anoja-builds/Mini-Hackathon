import { apiRequest } from "./api";

const INITIAL_MOCK_PICKUPS = [
  {
    id: 1021,
    donationId: 401,
    donationTitle: "50 Packets of Vegetable Fried Rice",
    organization: "Colombo Community Kitchen",
    organizationId: 1,
    pickupDate: "2026-09-04",
    pickupTime: "02:30 PM - 03:30 PM",
    pickupLocation: "Perera Bakers, No. 120, Galle Road, Wellawatte, Colombo 06",
    responsiblePerson: "Kavinda Silva (Volunteer Driver)",
    contactNumber: "077 123 4567",
    status: "Scheduled",
    notes: "Vehicle WP-CAD-4512. Bring thermal insulated bags. Call kitchen back door upon arrival."
  },
  {
    id: 1022,
    donationId: 402,
    donationTitle: "30 Fresh Bread Loaves & 40 Buns",
    organization: "Sarvodaya Community Center",
    organizationId: 2,
    pickupDate: "2026-09-04",
    pickupTime: "05:00 PM - 06:00 PM",
    pickupLocation: "Keells Supermarket, Dehiwala Junction",
    responsiblePerson: "Awaiting Driver Assignment",
    contactNumber: "071 987 6543 (Sarvodaya Coordinator)",
    status: "Pending",
    notes: "Claimed 15 mins ago. Needs volunteer driver with a car or van."
  },
  {
    id: 1023,
    donationId: 403,
    donationTitle: "15kg Fresh Organic Vegetables (Carrots, Beans)",
    organization: "Hope Elder's Home Moratuwa",
    organizationId: 3,
    pickupDate: "2026-09-03",
    pickupTime: "10:00 AM",
    pickupLocation: "Manning Market Complex, Peliyagoda",
    responsiblePerson: "Sunil Shantha",
    contactNumber: "076 555 1234",
    status: "Collected",
    notes: "Handover completed successfully. Produce distributed for lunch meals."
  },
  {
    id: 1024,
    donationId: 404,
    donationTitle: "25 Cooked Meal Packs (Curry & Rotis)",
    organization: "Voice for the Voiceless Sri Lanka",
    organizationId: 4,
    pickupDate: "2026-09-04",
    pickupTime: "07:30 PM - 08:30 PM",
    pickupLocation: "Cinnamon Grand Banquet Prep, Colombo 03",
    responsiblePerson: "Nalaka Dissanayake (Driver)",
    contactNumber: "072 888 9911",
    status: "Scheduled",
    notes: "Evening banquet surplus. Security pass registered under Nalaka."
  }
];

const STORAGE_KEY = "foodrescue_lk_pickups";

function getLocalPickups() {
  if (typeof window === "undefined") return INITIAL_MOCK_PICKUPS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_PICKUPS));
      return INITIAL_MOCK_PICKUPS;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_MOCK_PICKUPS;
  }
}

function saveLocalPickups(pickups) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pickups));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }
}

export const pickupService = {
  async getAllPickups() {
    try {
      const data = await apiRequest("/pickups");
      if (Array.isArray(data) && data.length > 0) return data;
      return getLocalPickups();
    } catch {
      return getLocalPickups();
    }
  },

  async getPickupById(id) {
    try {
      return await apiRequest(`/pickups/${id}`);
    } catch {
      const list = getLocalPickups();
      const item = list.find((p) => String(p.id) === String(id));
      if (!item) throw new Error("Pickup not found");
      return item;
    }
  },

  async createPickup(pickupData) {
    try {
      return await apiRequest("/pickups", {
        method: "POST",
        body: JSON.stringify(pickupData)
      });
    } catch {
      const list = getLocalPickups();
      const newPickup = {
        ...pickupData,
        id: Date.now()
      };
      const updated = [newPickup, ...list];
      saveLocalPickups(updated);
      return newPickup;
    }
  },

  async updatePickup(id, pickupData) {
    try {
      return await apiRequest(`/pickups/${id}`, {
        method: "PUT",
        body: JSON.stringify(pickupData)
      });
    } catch {
      const list = getLocalPickups();
      const index = list.findIndex((p) => String(p.id) === String(id));
      if (index === -1) throw new Error("Pickup not found");
      list[index] = { ...list[index], ...pickupData };
      saveLocalPickups(list);
      return list[index];
    }
  },

  async updateStatus(id, newStatus) {
    try {
      return await apiRequest(`/pickups/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      });
    } catch {
      const list = getLocalPickups();
      const index = list.findIndex((p) => String(p.id) === String(id));
      if (index === -1) throw new Error("Pickup not found");
      list[index] = { ...list[index], status: newStatus };
      saveLocalPickups(list);
      return list[index];
    }
  },

  async deletePickup(id) {
    try {
      return await apiRequest(`/pickups/${id}`, {
        method: "DELETE"
      });
    } catch {
      const list = getLocalPickups();
      const updated = list.filter((p) => String(p.id) !== String(id));
      saveLocalPickups(updated);
      return true;
    }
  }
};

