document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("mousedown", () => button.classList.add("is-pressed"));
        button.addEventListener("mouseup", () => button.classList.remove("is-pressed"));
        button.addEventListener("mouseleave", () => button.classList.remove("is-pressed"));
    });

    const progressBars = document.querySelectorAll("[data-progress-target]");
    const projectCards = document.querySelectorAll("[data-project-card]");

    const demoShells = document.querySelectorAll("[data-demo-shell]");
    demoShells.forEach((shell) => {
        const demoPanels = Array.from(shell.querySelectorAll("[data-demo-panel]"));
        const demoTabs = Array.from(shell.querySelectorAll("[data-demo-tab]"));

        const setActivePanel = (panelName) => {
            demoPanels.forEach((panel) => {
                panel.classList.toggle("is-active", panel.dataset.demoPanel === panelName);
            });

            demoTabs.forEach((tab) => {
                tab.classList.toggle("is-active", tab.dataset.demoTab === panelName);
            });
        };

        if (!demoTabs.length) {
            return;
        }

        demoTabs.forEach((tab) => {
            tab.addEventListener("click", () => setActivePanel(tab.dataset.demoTab));
        });

        let demoIndex = 0;
        const demoOrder = demoTabs.map((tab) => tab.dataset.demoTab);
        setActivePanel(demoOrder[0]);

        window.setInterval(() => {
            demoIndex = (demoIndex + 1) % demoOrder.length;
            setActivePanel(demoOrder[demoIndex]);
        }, 5000);
    });

    progressBars.forEach((bar) => {
        const target = Number(bar.dataset.progressTarget || "0");
        bar.style.width = "0%";
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                bar.style.width = `${target}%`;
            });
        });
    });

    const animateCards = () => {
        projectCards.forEach((card, index) => {
            window.setTimeout(() => {
                card.style.transition = "transform 300ms ease";
                card.style.transform = "translateY(-1px)";
                window.setTimeout(() => {
                    card.style.transform = "translateY(0)";
                }, 240);
            }, index * 240);
        });
    };

    animateCards();

    demoShells.forEach((demoShell) => {
        let rafId = 0;
        demoShell.addEventListener("mousemove", (event) => {
            const bounds = demoShell.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width) * 100;
            const y = ((event.clientY - bounds.top) / bounds.height) * 100;
            demoShell.style.setProperty("--glow-x", `${x}%`);
            demoShell.style.setProperty("--glow-y", `${y}%`);
            demoShell.classList.add("is-animated");
            window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(() => {});
        });
        demoShell.addEventListener("mouseleave", () => demoShell.classList.remove("is-animated"));
    });

    document.querySelectorAll("[data-next-action]").forEach((stack) => {
        const cards = Array.from(stack.querySelectorAll("[data-next-action-card]"));
        if (!cards.length) {
            return;
        }

        let activeIndex = 0;
        const pulse = () => {
            cards.forEach((card, index) => {
                card.classList.toggle("is-active", index === activeIndex);
            });
            activeIndex = (activeIndex + 1) % cards.length;
        };

        pulse();
        window.setInterval(pulse, 3500);
    });
});
