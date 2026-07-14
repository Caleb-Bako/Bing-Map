# Bingmap 🗺️

An interactive campus navigation app designed to help students find their way around school with ease. It provides categorized landmark data (classes, labs, restaurants, and more), includes image previews and descriptions, and allows user-driven updates to landmark names — all powered by custom logic and backend moderation.

🚧 **Note**: Backend moderation tools and voting features are under continuous development.

---

## 🛠️ Technologies
* **Frontend:** React Native
* **Database Layer:** Supabase
* **Map System:** Google Maps API

---

## ✨ Features
You can find your way around campus and help keep the map accurate for everyone:
* **Landmark Navigation:** Find key campus spots like lecture halls, labs, libraries, eateries, and more.
* **Categorized Information:** Landmarks are grouped into types (e.g., Classes, Labs, Restaurants) for easy filtering.
* **Landmark Images and Info:** View pictures and helpful details for each location.
* **Dynamic Name Updates:** Users can suggest new names for landmarks, filtered by a logic system plus vote count and gated behind backend approval.
* **Voting System for Name Changes:** Vote on landmark name suggestions submitted by other users.
* **User Involvement in Map Updates:** Keeps the app community-driven while retaining backend control to ensure accuracy.

---

## ⚙️ Process
Why I built this is because navigating a large campus as a new or even returning student is genuinely disorienting—lecture halls, labs, and eateries all blur together, and there's no single source of truth for where things actually are or what they're currently called. I wanted an app that combined a real map with community knowledge, so the data stays accurate over time instead of going stale the moment it's published.

Finding the right database ended up being a bigger challenge than expected. I initially built on MongoDB Realm, but ran into persistent issues with `useQuery` that kept getting in the way of reliable data fetching. I switched to Supabase instead, which was new to me at the time but turned out to be fast, easy to set up, and much more straightforward to work with for this kind of structured, relational landmark data.

For the map itself, I deliberately kept things simple so the app wouldn't take long to load. I tested a few different map APIs before settling on Google Maps, which came out on top—it's not always the most up-to-date option, but it's reliable and even comes with a built-in direction matrix, which made routing between landmarks much easier to implement than building that logic from scratch.

---

## 🧠 What I Learnt
* **Choosing the Right Database Early:** Not every database fits every use case. Running into friction with MongoDB Realm's `useQuery` taught me to evaluate a database against my actual query patterns early, rather than committing and discovering the mismatch later.
* **Performance-Conscious Map Integration:** Keeping the map simple and lightweight directly impacted load times, reinforcing that "more features" isn't always the right call when performance is on the line.
* **Trade-offs in Third-Party APIs:** Comparing map providers showed me that no API is perfect—Google Maps isn't always fully current, but its reliability and built-in tools like the direction matrix outweighed that trade-off for this app.
* **Community-Driven Data with Guardrails:** Designing the vote-plus-approval system for landmark name changes helped me think through how to let users contribute without sacrificing data accuracy.

---

## 🚀 How Can It Be Improved
* **Backend Moderation Dashboard:** Manage suggestions, view stats, and approve community updates.
* **Offline Mode:** Enable map usage even without internet.
* **Admin Tools:** Batch import landmarks and manage categories directly.

---

## 💻 How to Run & Test Locally

Ensure you have Node.js and npm installed on your machine, plus the **Expo Go** app installed on your Android or iOS device.

```bash
# Clone the repository and navigate into it
cd bingmap

# Install dependencies
npm install

# Add your environment configuration:
# SUPABASE_URL=your_supabase_project_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Start the Expo development server
npx expo start
```
<img width="205" height="453" alt="Screenshot 2024-05-27 060018" src="https://github.com/user-attachments/assets/6722fce4-24a7-4c63-ae7a-0f5d70970f44" /> <img width="206" height="449" alt="Screenshot 2024-05-27 073613" src="https://github.com/user-attachments/assets/324fb3de-5f05-4d0a-b822-7ad51fbf1897" /><img width="206" height="437" alt="Screenshot 2024-05-27 080610" src="https://github.com/user-attachments/assets/926f184e-0372-4115-ad9c-dfae98adeb4b" /> <img width="205" height="437" alt="Screenshot 2024-05-27 081242" src="https://github.com/user-attachments/assets/842d44e3-c620-4a52-ae76-c7b4e62ff8b7" />



Once the Metro bundler starts, scan the QR code with the Expo Go app (or your device's camera on iOS) to load the app on your phone. Browse landmarks by category, view images and details, and try suggesting a name update!

🤝 Let's Connect
Curious about the Supabase schema, the landmark voting/approval logic, or how the Google Maps direction matrix is wired in? Reach out—let's build!
