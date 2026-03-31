export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "upcoming" | "past" | "participated";
  status?: string;
  result?: string;
}

export const events: Event[] = [
  { id: "1", title: "Regional Ultimate Championship", date: "April 15, 2026", time: "9:00 AM", location: "City Sports Complex", description: "Annual regional championship featuring top teams from across the state.", type: "upcoming", status: "Registration Open" },
  { id: "2", title: "Spring Training Camp", date: "April 22, 2026", time: "10:00 AM", location: "Goosebumps Home Field", description: "Intensive training camp for skill development and team building.", type: "upcoming", status: "Limited Spots" },
  { id: "3", title: "Beach Ultimate Tournament", date: "May 5, 2026", time: "8:00 AM", location: "Sunset Beach", description: "Fun beach tournament with teams from neighboring cities.", type: "upcoming", status: "Coming Soon" },
  { id: "4", title: "Winter League Finals", date: "March 10, 2026", time: "2:00 PM", location: "Indoor Sports Arena", description: "Championship game of the winter indoor league.", type: "past", result: "Champions" },
  { id: "5", title: "Charity Disc Golf Event", date: "February 28, 2026", time: "11:00 AM", location: "Riverside Park", description: "Fundraiser event combining disc golf and ultimate frisbee.", type: "past", result: "Raised $5,000" },
  { id: "6", title: "Inter-Club Friendly", date: "February 15, 2026", time: "3:00 PM", location: "University Grounds", description: "Friendly matches against university teams.", type: "past", result: "Won 3-1" },
  { id: "7", title: "National Ultimate Series", date: "January 20, 2026", time: "All Day", location: "National Stadium", description: "Represented the region at the national level tournament.", type: "participated", result: "Semi-Finals" },
  { id: "8", title: "Spirit of the Game Workshop", date: "December 5, 2025", time: "10:00 AM", location: "Community Center", description: "Workshop on fair play and sportsmanship principles.", type: "participated", result: "Spirit Award" },
  { id: "9", title: "Youth Ultimate Clinic", date: "November 15, 2025", time: "9:00 AM", location: "Local High School", description: "Coaching clinic for young aspiring ultimate players.", type: "participated", result: "50+ Kids Trained" },
];

export const getEventsByType = (type?: string) => {
  if (type && ["upcoming", "past", "participated"].includes(type)) {
    return events.filter((e) => e.type === type);
  }
  return events;
};
