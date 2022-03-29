const packages = [];
const packagesContainer = document.getElementById("packages");

const filters = {Priority: "Any", Weight: "Any", Fragile: "Any", hidden: false};
const buttonElements = {Priority: document.getElementById("priority-button"), Weight: document.getElementById("weight-button"), Fragile: document.getElementById("fragile-button"), hidden: document.getElementById};

const randChars = "abcdefghijklmnopqrstuvwxyz01233456789";

function addRandomPackages(count)
{
    for(let i = 0; i < count; i++)
    {
        
        const newPackage =
        {
            from: randString(8, 26),
            to: randString(8, 26),
            weight: (Math.round(Math.random()) == 1 ? true : false),
            priority: (Math.round(Math.random()) == 1 ? true : false),
            fragile: (Math.round(Math.random()) == 1 ? true : false),
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

function toggleFilter(filter)
{
    switch(filters[filter])
    {
        case "Any":
            filters[filter] = "Yes";
            break;
        case "Yes":
            filters[filter] = "No";
            break;
        case "No":
            filters[filter] = "Any";
            break;
    }

    buttonElements[filter].innerText = filter + ": " + filters[filter];

    updatePackages();
}

function toggleHidden()
{
    filters.hidden = !filters.hidden;
    updatePackages();
}

function draw()
{
    let template = "";

    packages.forEach(package => 
    {
        
        template += 
        `
        <div class="col-12 col-md-4" id="${package.tracking}">
        <div class="card m-2 p-3">
                <h4 class="card-title">To: ${package.to}</h4>
                <h5 class="card-subtitle">From: ${package.from}</h5>
                <h6 class="card-subtitle text-dark mt-2 text-center">
                    <i class="${package.priority ? "mdi mdi-exclamation-thick" : ""}" title="priority package"></i>
                    <i class="${package.weight ? "mdi mdi-weight" : ""}" title="heavy package"></i>
                    <i class="${package.fragile ? "mdi mdi-glass-fragile" : ""}" title="fragile package"></i>
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
        if(filters.Weight == "Yes" && package.weight === false ||
           filters.Weight == "No" && package.weight === true ||
           filters.Priority == "Yes" && package.priority === false ||
           filters.Priority == "No" && package.priority === true ||
           filters.Fragile == "Yes" && package.fragile === false ||
           filters.Fragile == "No" && package.fragile === true)
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