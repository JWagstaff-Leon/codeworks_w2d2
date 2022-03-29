const packages = [];
const packagesContainer = document.getElementById("packages");

const filters = {Priority: "Any", Weight: "Any", Fragile: "Any", hidden: false};
const buttonElements = {Priority: document.getElementById("priority-button"), Weight: document.getElementById("weight-button"), Fragile: document.getElementById("fragile-button"), hidden: document.getElementById("show-hide-button")};

const randChars = "abcdefghijklmnopqrstuvwxyz01233456789";

let correctPackage;

function startGame(packageCount)
{
    addRandomPackages(packageCount);
    
    correctPackage = packages[Math.floor(Math.random() * packageCount)];
}

function endGame()
{
    correctPackage = undefined;
    
    for (let i = packages.length; i > 0; i--)
    {
        packages.pop();
    }
    
    filters.Priority = "Any";
    filters.Weight = "Any";
    filters.Fragile = "Any";
    filters.hidden = false;

    draw();
}

function addRandomPackages(count)
{
    for(let i = 0; i < count; i++)
    {
        
        const newPackage =
        {
            from: randString(8, 26),
            to: randString(8, 26),
            Weight: (Math.round(Math.random()) == 1 ? true : false),
            Priority: (Math.round(Math.random()) == 1 ? true : false),
            Fragile: (Math.round(Math.random()) == 1 ? true : false),
            tracking: randString(8, Infinity) + "-" + randString(8, Infinity),
            element: undefined
        };

        newPackage.from = newPackage.from[0].toUpperCase() + newPackage.from.substr(1);
        newPackage.to = newPackage.to[0].toUpperCase() + newPackage.to.substr(1);

        packages.push(newPackage)
    }

    draw();
}

function randString(length, end)
{
    let randomString = "";
    for (let i = 0; i < length; i++)
    {
        randomString += randChars[Math.floor(Math.random() * Math.min(randChars.length, end))];    
    }

    return randomString;
}

function guess(guessID)
{
    if(guessID === correctPackage.tracking)
    {
        alert("You're winner!");
    }
    else
    {
        alert("Nah; nah; you suck");
    }

    endGame();
}

function toggleFilter(filter)
{
    filters[filter] = (correctPackage[filter] ? "Yes" : "No");
    updateFilterTexts();
    updatePackages();
}

function updateFilterTexts()
{
    buttonElements.Priority.innerText = "Priority: " + filters.Priority;
    buttonElements.Weight.innerText = "Weight: " + filters.Weight;
    buttonElements.Fragile.innerText = "Fragile: " + filters.Fragile;
}

function toggleHidden()
{
    filters.hidden = !filters.hidden;

    updateHiddenText();
    updatePackages();
}
function updateHiddenText()
{
    buttonElements.hidden.innerText = (filters.hidden ? "Show" : "Hide") + " Filtered";
}

function draw()
{
    updateFilterTexts();
    updateHiddenText();
    let template = "";

    packages.forEach(package => 
    {
        
        template += 
        `
        <div class="col-12 col-md-4" id="${package.tracking}">
        <div class="card m-2 p-3" onclick="guess('${package.tracking}')">
                <h4 class="card-title">To: ${package.to}</h4>
                <h5 class="card-subtitle">From: ${package.from}</h5>
                <h6 class="card-subtitle text-dark mt-2 text-center">
                    <i class="${package.Priority ? "mdi mdi-exclamation-thick" : ""}" title="priority package"></i>
                    <i class="${package.Weight ? "mdi mdi-weight" : ""}" title="heavy package"></i>
                    <i class="${package.Fragile ? "mdi mdi-glass-fragile" : ""}" title="fragile package"></i>
                    </h6>
                    <hr>
                    <h4 class="card-text">Tracking number:</h4>
                    <h3>${package.tracking}</h3>
                    </div>
                    </div>
        `;
    });

    packagesContainer.innerHTML = template;

    updatePackages();
}

function updatePackages()
{
    packages.forEach((package, index) =>
    {
        package.element = document.getElementById(package.tracking);
    
        package.element.children[0].classList.add((index % 2 === 0 ? "text-dark" : "text-light"));
        package.element.children[0].classList.add((index % 2 === 0 ? "bg-light" : "bg-dark"));
        if(filters.Weight == "Yes" && package.Weight === false ||
           filters.Weight == "No" && package.Weight === true ||
           filters.Priority == "Yes" && package.Priority === false ||
           filters.Priority == "No" && package.Priority === true ||
           filters.Fragile == "Yes" && package.Fragile === false ||
           filters.Fragile == "No" && package.Fragile === true)
        {
            package.element.children[0].classList.add("filtered-package");
            if(filters.hidden)
            {
                package.element.classList.add("d-none");
            }
            else
            {
                package.element.classList.remove("d-none");
            }
        }
        else
        {
            package.element.children[0].classList.remove("filtered-package");
            package.element.classList.remove("d-none");
        }

        switch(filters.Priority)
        {
            case "Any":
                package.element.children[0].children[2].children[0].classList.remove("yes-priority")
                package.element.children[0].children[2].children[0].classList.remove("no-priority")
                break;
            case "Yes":
                package.element.children[0].children[2].children[0].classList.add("yes-priority")
                package.element.children[0].children[2].children[0].classList.remove("no-priority")
                break;
            case "No":
                package.element.children[0].children[2].children[0].classList.remove("yes-priority")
                package.element.children[0].children[2].children[0].classList.add("no-priority")
                break;
        }

        switch(filters.Weight)
        {
            case "Any":
                package.element.children[0].children[2].children[1].classList.remove("yes-weight")
                package.element.children[0].children[2].children[1].classList.remove("no-weight")
                break;
            case "Yes":
                package.element.children[0].children[2].children[1].classList.add("yes-weight")
                package.element.children[0].children[2].children[1].classList.remove("no-weight")
                break;
            case "No":
                package.element.children[0].children[2].children[1].classList.remove("yes-weight")
                package.element.children[0].children[2].children[1].classList.add("no-weight")
                break;
            }
            
            switch(filters.Fragile)
            {
                case "Any":
                    package.element.children[0].children[2].children[2].classList.remove("yes-fragile")
                    package.element.children[0].children[2].children[2].classList.remove("no-fragile")
                    break;
                case "Yes":
                    package.element.children[0].children[2].children[2].classList.add("yes-fragile")
                    package.element.children[0].children[2].children[2].classList.remove("no-fragile")
                    break;
                case "No":
                    package.element.children[0].children[2].children[2].classList.remove("yes-fragile")
                    package.element.children[0].children[2].children[2].classList.add("no-fragile")
                    break;
            }
    });
}

draw();