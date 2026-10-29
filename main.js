
(function () {
    "use strict";

    function initializeWebsite() {

        // =====================================
        // VIEW ALL / VIEW LESS COURSES
        // =====================================

        const viewAllButton = document.getElementById("viewAllCourses");
        const viewLessButton = document.getElementById("viewLessCourses");
        const additionalCourses = document.querySelectorAll(".additional-course");
        const featuredCourses = document.getElementById("featured-courses");

        if (viewAllButton && viewLessButton) {

            viewAllButton.addEventListener("click", function () {

                additionalCourses.forEach(function (course) {
                    course.hidden = false;
                });

                viewAllButton.hidden = true;
                viewLessButton.hidden = false;

                viewAllButton.setAttribute("aria-expanded", "true");
                viewLessButton.setAttribute("aria-expanded", "true");

            });

            viewLessButton.addEventListener("click", function () {

                additionalCourses.forEach(function (course) {
                    course.hidden = true;
                });

                viewLessButton.hidden = true;
                viewAllButton.hidden = false;

                viewAllButton.setAttribute("aria-expanded", "false");
                viewLessButton.setAttribute("aria-expanded", "false");

                if (featuredCourses) {
                    featuredCourses.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        }


        // =====================================
        // FAQ ACCORDION
        // =====================================

        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach(function (item) {

            const question = item.querySelector(".faq-question");
            const icon = item.querySelector(".faq-icon");

            // Skip incomplete FAQ items safely.
            if (!question || !icon) {
                return;
            }

            question.addEventListener("click", function () {

                const isOpen = item.classList.contains("active");

                // Close all FAQ items.
                faqItems.forEach(function (faq) {

                    faq.classList.remove("active");

                    const faqQuestion =
                        faq.querySelector(".faq-question");

                    const faqIcon =
                        faq.querySelector(".faq-icon");

                    if (faqQuestion) {
                        faqQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                    if (faqIcon) {
                        faqIcon.textContent = "+";
                    }

                });

                // Reopen the clicked item only if it was closed.
                if (!isOpen) {

                    item.classList.add("active");

                    question.setAttribute("aria-expanded", "true");
                    icon.textContent = "−";

                }

            });

        });


        // =====================================
        // COURSE INFORMATION TABS
        // =====================================

        const tabs = document.querySelectorAll(".course-tab");
        const panels = document.querySelectorAll(".course-tab-panel");

        function activateTab(tab, moveFocus = false) {

            const targetId = tab.dataset.tab;
            const targetPanel = document.getElementById(targetId);

            if (!targetPanel || !targetPanel.classList.contains("course-tab-panel")) {
                return;
            }

            tabs.forEach(function (item) {

                const isActive = item === tab;

                item.classList.toggle("active", isActive);

                item.setAttribute(
                    "aria-selected",
                    String(isActive)
                );

                item.tabIndex = isActive ? 0 : -1;

            });

            panels.forEach(function (panel) {

                const isActive = panel === targetPanel;

                panel.hidden = !isActive;
                panel.classList.toggle("active", isActive);

            });

            if (moveFocus) {
                tab.focus();
            }

        }

        tabs.forEach(function (tab) {

            tab.addEventListener("click", function () {
                activateTab(tab);
            });

            tab.addEventListener("keydown", function (event) {

                const tabArray = Array.from(tabs);
                const index = tabArray.indexOf(tab);

                let nextIndex;

                switch (event.key) {

                    case "ArrowRight":
                        nextIndex = (index + 1) % tabArray.length;
                        break;

                    case "ArrowLeft":
                        nextIndex = (
                            index - 1 + tabArray.length
                        ) % tabArray.length;
                        break;

                    case "Home":
                        nextIndex = 0;
                        break;

                    case "End":
                        nextIndex = tabArray.length - 1;
                        break;

                    default:
                        return;

                }

                event.preventDefault();
                activateTab(tabArray[nextIndex], true);

            });

        });


        // =====================================
        // MOBILE NAVIGATION
        // =====================================

        const menuToggle = document.getElementById("mobileMenuToggle");
        const navigation = document.querySelector(".course-navigation");

        if (menuToggle && navigation) {

            function closeMobileMenu() {

                navigation.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

            menuToggle.addEventListener("click", function () {

                const isOpen = navigation.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen ? "Close navigation" : "Open navigation"
                );

                menuToggle.innerHTML = isOpen
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';

            });

            navigation.querySelectorAll("a").forEach(function (link) {

                link.addEventListener("click", closeMobileMenu);

            });

            window.addEventListener("resize", function () {

                if (window.innerWidth > 760) {
                    closeMobileMenu();
                }

            });

        }


        // =====================================
        // FOOTER COPYRIGHT YEAR
        // =====================================

        const footerYear = document.getElementById("courseFooterYear");

        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }

    }


    // Run correctly whether the DOM is loading or already ready.
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeWebsite,
            { once: true }
        );
    } else {
        initializeWebsite();
    }

})();
