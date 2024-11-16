// Story structure: Each part of the story is defined as an object
const storyParts = {
    start: {
        text: "You find yourself at the edge of a mysterious forest...",
        options: [
            { text: "Follow the sound of the brook.", next: "brook" },
            { text: "Follow the glowing footprints.", next: "footprints" }
        ],
        background: "url('forest_start.jpg')"
    },
    brook: {
        text: "You hear the sound of water and follow it to a crystal-clear stream...",
        options: [
            { text: "Reach in and grab the shiny object.", next: "gem" },
            { text: "Continue along the path.", next: "path" }
        ],
        background: "url('brook.jpg')"
    },
    footprints: {
        text: "You follow the glowing footprints into a clearing with a giant tree...",
        options: [
            { text: "Open the door and go inside.", next: "insideTree" },
            { text: "Explore the clearing further.", next: "clearing" }
        ],
        background: "url('footprints.jpg')"
    },
    gem: {
        text: "You find a sparkling gem. Holding it fills you with energy.",
        options: [
            { text: "Keep the gem.", next: "continuePath" },
            { text: "Throw it back into the stream.", next: "backStream" }
        ],
        background: "url('gem.jpg')"
    },
    insideTree: {
        text: "Inside the tree, a friendly gnome greets you.",
        options: [
            { text: "Take the map.", next: "map" },
            { text: "Take the magical potion.", next: "potion" }
        ],
        background: "url('gnome_tree.jpg')"
    },
    path: {
        text: "The path leads to a meadow filled with glowing flowers...",
        options: [
            { text: "Pick a flower.", next: "flower" },
            { text: "Sit and rest.", next: "rest" }
        ],
        background: "url('meadow.jpg')"
    },
    clearing: {
        text: "In the clearing, you find a circle of stones with runes glowing faintly.",
        options: [
            { text: "Touch the stones.", next: "runes" },
            { text: "Sit and observe.", next: "observe" }
        ],
        background: "url('clearing.jpg')"
    },
    runes: {
        text: "The runes pulse with light and teleport you to a hidden cave...",
        options: [
            { text: "Explore the cave.", next: "cave" },
            { text: "Try to teleport back.", next: "teleportBack" }
        ],
        background: "url('cave.jpg')"
    },
    flower: {
        text: "You pick a glowing flower and it grants you a vision of the forest's secrets.",
        options: [{ text: "Continue on your journey.", next: "start" }],
        background: "url('flower.jpg')"
    },
    rest: {
        text: "You sit and rest, feeling the magic of the forest rejuvenating you.",
        options: [{ text: "Return to the path.", next: "start" }],
        background: "url('rest.jpg')"
    },
    map: {
        text: "You take the map, which reveals hidden paths through the forest.",
        options: [{ text: "Follow the map.", next: "path" }],
        background: "url('map.jpg')"
    },
    potion: {
        text: "The potion grants you temporary invisibility to explore the forest unseen.",
        options: [{ text: "Use the potion.", next: "clearing" }],
        background: "url('potion.jpg')"
    },
    cave: {
        text: "In the cave, you find ancient treasures guarded by a sleeping dragon.",
        options: [{ text: "Return quietly to the clearing.", next: "clearing" }],
        background: "url('cave_treasure.jpg')"
    },
    teleportBack: {
        text: "You successfully teleport back to the clearing.",
        options: [{ text: "Explore the clearing further.", next: "clearing" }],
        background: "url('teleport.jpg')"
    }
};

// Keeps track of the player's choices
let journey = [];

// Function to display the story based on the part
function displayStoryPart(part) {
    const storyText = document.getElementById("storyText");
    const optionsDiv = document.getElementById("options");
    const currentPart = storyParts[part];

    // Validate if the story part exists
    if (!currentPart) {
        storyText.textContent = "Something went wrong. Unable to load this part of the story.";
        optionsDiv.innerHTML = "";
        return;
    }

    // Update text and background
    storyText.textContent = currentPart.text;
    document.body.style.backgroundImage = currentPart.background;

    // Track user progress
    journey.push(currentPart.text);

    // Clear previous options and add new ones
    optionsDiv.innerHTML = "";
    currentPart.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => displayStoryPart(option.next);
        optionsDiv.appendChild(button);
    });
}

// Stop story function
function stopStory() {
    const storyText = document.getElementById("storyText");
    const optionsDiv = document.getElementById("options");

    // Set final message and clear options
    storyText.textContent = "Thank you for playing! Your adventure is saved. Come back soon!";
    optionsDiv.innerHTML = ""; // Remove all buttons and options
    journey.push("Story ended by user.");

    // Disable all child buttons within the container
    const buttons = optionsDiv.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true; // Disable buttons if any remain (fallback safety)
        button.style.display = "none"; // Ensure they are hidden
    });
}

// Modal functions
function openHelp() {
    document.getElementById("helpModal").style.display = "block";
}

function closeHelp() {
    document.getElementById("helpModal").style.display = "none";
}

function showSummary() {
    const summaryList = document.getElementById("journeyList");
    summaryList.innerHTML = journey.map((step, index) => `<li>${index + 1}: ${step}</li>`).join("");
    document.getElementById("summaryModal").style.display = "block";
}

function closeSummary() {
    document.getElementById("summaryModal").style.display = "none";
}

// Start the story
displayStoryPart("start");
