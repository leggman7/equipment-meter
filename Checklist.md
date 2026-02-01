# Mining Equipment Hour Meter Tracker — Test Checklist

**Website Purpose:** A web application to track and update hour meter readings on mining equipment.
**Pages:** Main (Equipment List) | About

---

## 1. Navigation & Routing

- **[Nav]** Given I am on any page → When I look at the top of the screen → Then a navigation bar should be visible containing links to both "Main" (or "Equipment") and "About".
- **[Nav]** Given I am on the About page → When I click the "Main" or "Equipment" nav link → Then I should be taken back to the main equipment list page.
- **[Nav]** Given I am on the Main page → When I click the "About" nav link → Then I should be taken to the About page.
- **[Nav]** Given I navigate to a non-existent URL → Then a custom 404 page should be displayed, not a blank or broken screen.

---

## 2. Main Page — Equipment List (Visual & Layout)

- **[Layout]** Given I am on the Main page → When the page loads → Then a list or grid of all mining equipment should be displayed.
- **[Layout]** Given there are multiple pieces of equipment → When I view the Main page → Then each piece of equipment should be shown as its own distinct card or row.
- **[Layout]** Given I am viewing an equipment card → When I look at it → Then it should clearly display the equipment name and its current hour meter reading.
- **[Layout]** Given I am on a desktop screen (1024px+) → When I view the equipment list → Then the cards or rows should be arranged in a clean, readable layout (e.g., a grid or table).
- **[Layout]** Given I am on a mobile screen (under 768px) → When I view the equipment list → Then the layout should stack into a single column so nothing is cut off or overlapping.
- **[Layout]** Given the equipment list is long → When I scroll down → Then all equipment items should load and be visible (or pagination/scroll should work correctly).

---

## 3. Main Page — Hour Meter Data

- **[Data]** Given I am on the Main page → When the page loads → Then every piece of equipment should display a numerical hour meter value.
- **[Data]** Given I look at an equipment card → When I read the hour meter value → Then it should be clearly labeled (e.g., "Hour Meter: 4,520 hrs") so it is not ambiguous.
- **[Data]** Given I update an equipment's hour meter (see Functionality tests below) → When I return to or refresh the Main page → Then the updated value should be reflected on that equipment's card.
- **[Data]** Given there is no equipment entered yet → When I view the Main page → Then a helpful message should appear (e.g., "No equipment added yet") instead of a blank page.

---

## 4. Main Page — Update Hour Meter (Functionality)

- **[Function]** Given I am on the Main page → When I click on an equipment card or an "Update" button → Then I should be able to enter or edit the hour meter reading for that piece of equipment.
- **[Function]** Given I am editing an hour meter value → When I enter a valid number and confirm/save → Then the new value should be saved and displayed on the card.
- **[Function]** Given I am editing an hour meter value → When I enter a non-numeric value (e.g., letters or symbols) → Then a validation error should appear and the update should not be saved.
- **[Function]** Given I am editing an hour meter value → When I enter a negative number → Then a validation error should appear, as hour meters cannot go backwards.
- **[Function]** Given I am editing an hour meter value → When I enter a value lower than the current reading → Then either a warning or an error should appear, since hour meters only increase.
- **[Function]** Given I open the edit/update input → When I click cancel or click away without saving → Then the original hour meter value should remain unchanged.

---

## 5. About Page (Visual & Content)

- **[Content]** Given I am on the About page → When the page loads → Then it should clearly state that the purpose of this website is to track and update hour meter readings on mining equipment.
- **[Content]** Given I am on the About page → When I read the page → Then the text should be well-formatted, readable, and free of placeholder or "Lorem Ipsum" text.
- **[Layout]** Given I am on the About page on a mobile device → When I view the content → Then the text and layout should resize properly and remain fully readable without horizontal scrolling.

---

## 6. Responsiveness (All Pages)

- **[Responsive]** Given I am on any page at a viewport width of 768px or less → When I view the page → Then the navigation should collapse into a hamburger menu or a mobile-friendly layout.
- **[Responsive]** Given I am on any page → When I resize the browser from desktop to mobile → Then no content should overflow, overlap, or become hidden.
- **[Responsive]** Given I am on any page on a tablet (768px–1024px) → When I view the layout → Then it should adapt cleanly between the mobile and desktop layouts without awkward gaps or misalignment.

---

## 7. General / Edge Cases

- **[General]** Given I am on any page → When the page loads → Then there should be no visible broken images, missing icons, or console errors.
- **[General]** Given I am on any page → When I look at the page title in the browser tab → Then it should reflect the current page (e.g., "Main — Mining Equipment Tracker" or "About — Mining Equipment Tracker").
- **[General]** Given I refresh the Main page after updating an hour meter → When the page reloads → Then all previously saved hour meter values should still be present (data persists).
- **[General]** Given I am on any page → When I look at the overall design → Then the styling (colors, fonts, spacing) should be consistent across both the Main and About pages.
