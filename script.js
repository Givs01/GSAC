document.addEventListener("DOMContentLoaded", function() {
    // Check if the splash screen is present
    var splashScreen = document.getElementById("splash-screen");

    if (splashScreen) {
        // Set a timeout to redirect after 3 seconds
        setTimeout(function() {
            // Redirect to the home page
            window.location.href = "home.html";
        }, 3000);

        // Stop the refresh function
        window.addEventListener("beforeunload", function(event) {
            // Optionally, you can provide a confirmation message
            // event.returnValue = "Are you sure you want to leave?";
            // Uncomment the line above if you want a confirmation message
        });
    }
});


// search
    function toggleOverlay() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'flex' : 'none';
    }

    function toggleSearchInput() {
        var searchInput = document.getElementById('search-input');
        searchInput.style.display = (searchInput.style.display === 'none' || searchInput.style.display === '') ? 'block' : 'none';
    }

    function redirectToDynamicURL() {
        var searchInput = document.getElementById('search-input');
        var searchTerm = searchInput.value.trim();

         if (searchTerm !== '') {
            var dynamicURL = 'https://cwas.org.in/search?search=' + encodeURIComponent(searchTerm);

  

            // Open the new window with the dynamic URL
            window.open(dynamicURL, '_blank');
			          // Close the overlay before opening the new window
            
			toggleOverlay();

            // Clear the search input after redirecting
            searchInput.value = '';

            // Prevent the default form submission behavior
            return false;
        }
    }

  

function openDrawer() {
    document.getElementById("app-drawer").style.width = "250px";
    document.getElementById("back-button").style.display = "block";
    document.getElementById("menu-icon").style.display = "none";
    
    // Add mousedown event listener to close the drawer when clicking outside
    document.addEventListener("mousedown", closeDrawerOutside);
}

function closeDrawer() {
    document.getElementById("app-drawer").style.width = "0";
    document.getElementById("back-button").style.display = "none";
    document.getElementById("menu-icon").style.display = "block";

    // Remove the mousedown event listener when the drawer is closed
    document.removeEventListener("mousedown", closeDrawerOutside);
}

function closeDrawerOutside(event) {
    // Get the drawer element
    var drawer = document.getElementById("app-drawer");

    // Check if the clicked element is not inside the drawer
    if (!drawer.contains(event.target)) {
        closeDrawer();
    }
}

document.getElementById("menu-icon").addEventListener("click", openDrawer);
document.getElementById("close-icon").addEventListener("click", closeDrawer);
document.getElementById("back-button").addEventListener("click", closeDrawer);



//Programme page

  // Event data structure
        var eventData = {
            "2024-01-11": [
                { time: "10:00 AM - 12:00 PM", name: "Event 1", location: "Location 1", type: "Workshop" },
                { time: "01:00 PM - 02:00 PM", name: "Event 2", location: "Location 3", type: "Networking" },
				{ time: "01:00 PM - 02:00 PM", name: "Event 2", location: "Location 3", type: "Networking" },
				{ time: "01:00 PM - 02:00 PM", name: "Event 2", location: "Location 3", type: "Networking" }
                // Add more events for Jan 11
            ],
			
            "2024-01-12": [
                { time: "10:00 AM - 12:00 PM", name: "Event 3", location: "Location 2", type: "Seminar" }
                // Add more events for Jan 12
            ]
            // Add more dates with respective events
        };

        // JavaScript for handling date selection, event searching, and adding to schedule
        document.getElementById('search-bar').addEventListener('input', function () {
            filterEventsByName(this.value);
        });

        var dateCards = document.querySelectorAll('.date-card');
        dateCards.forEach(function (dateCard) {
            dateCard.addEventListener('click', function () {
                dateCards.forEach(function (card) {
                    card.classList.remove('selected');
                });
                this.classList.add('selected');
                var selectedDate = this.getAttribute('data-date');
                displayTimeSlots(selectedDate);
                filterEventsByDate(selectedDate);
            });
        });

        // Default date
        var defaultDate = "2024-01-11";
        dateCards.forEach(function (dateCard) {
            if (dateCard.getAttribute('data-date') === defaultDate) {
                dateCard.click(); // Simulate a click on the default date
            }
        });

        function displayTimeSlots(selectedDate) {
            var timeSlotsContainer = document.getElementById('time-slots-container');
            timeSlotsContainer.innerHTML = '';

            if (eventData[selectedDate]) {
                eventData[selectedDate].forEach(function (event) {
                    var timeSlotDiv = document.createElement('div');
                    timeSlotDiv.className = 'time-slot';
                    timeSlotDiv.innerHTML = '<h2>' + event.time + '</h2>';
                    timeSlotsContainer.appendChild(timeSlotDiv);

                    var eventItemDiv = document.createElement('div');
                    eventItemDiv.className = 'event-item';
                    eventItemDiv.setAttribute('data-date', selectedDate);
                    eventItemDiv.innerHTML = '<div class="event-details">' +
                        '<strong>' + event.name + '</strong><br>' +
                        '<div class="location-info">' +
                        '<img src="location.jpg" alt="Location" class="location-icon">' +
                        '<span>' + event.location + '</span>' +
                        '</div>' +
                        '<div class="event-type-info">' +
                        '<span>Event type:</span>' + event.type +
                        '</div>' +
                        '</div>' +
                        '<button class="add-to-schedule-btn" onclick="addToSchedule(\'' + event.name + '\', \'' + event.location + '\', \'' + event.type + '\')">Add to My Schedule</button>';
                    timeSlotsContainer.appendChild(eventItemDiv);
                });
            }
        }

        function filterEventsByDate(selectedDate) {
            var eventItems = document.getElementsByClassName('event-item');
            for (var i = 0; i < eventItems.length; i++) {
                var eventDate = eventItems[i].getAttribute('data-date');
                if (eventDate === selectedDate) {
                    eventItems[i].style.display = 'block';
                } else {
                    eventItems[i].style.display = 'none';
                }
            }
        }

        function filterEventsByName(searchTerm) {
            var eventItems = document.getElementsByClassName('event-item');
            for (var i = 0; i < eventItems.length; i++) {
                var eventName = eventItems[i].textContent.toLowerCase();
                if (eventName.includes(searchTerm.toLowerCase())) {
                    eventItems[i].style.display = 'block';
                } else {
                    eventItems[i].style.display = 'none';
                }
            }
        }

        function addToSchedule(eventName, location, eventType) {
            // Simulate sending a notification
            alert(`Event '${eventName}' at ${location} (${eventType}) added to your schedule!`);
        }

