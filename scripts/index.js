$(document).ready(init)

const COUNTRIES_API_URL = "https://restcountries.com/v3.1";

function init() {

    $("#allCountries").on("click", getCountriesData)

    $("#specificCounty").on("click", function () {
        const myCnt = $("#specCountryInput").val().toString()
        getCountriesData(myCnt)
    })

}

async function getCountriesData(countyname = "") {
    drawLoader();

    let params = "";

    if (typeof countyname === "object") {
        params = "all";
    } else if (typeof countyname === "string") {
        params = `name/${countyname}`;
    } else {
        alert("invalid input")
        return
    }

    try {
        const result = await fetch(`${COUNTRIES_API_URL}/${params}`);
        const resultJson = await result.json()
        const countriesArr = []
        resultJson.map(function (county) {
            countriesArr.push({
                countryName: county.name.common,
                countyPopulation: county.population,
                countryRegion: county.region,
                countryCurrencies: county.currencies,
            })
        })
        drawCountries(countriesArr);
        if (countriesArr.length > 1) {
            drawStatics(countriesArr);
            drawRegions(countriesArr)
        }

    } catch (error) {
        invalidCountryPopUp()
        clearLoader()
        console.log(error);
    }
}

function drawStatics(arr) {
    $("#statics").html("")
    const populationArr = []
    arr.map(function (country) {
        populationArr.push(Number(country.countyPopulation))
    })
    const sum = populationArr.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);

    const sumOgCountries = arr.length;
    const avgPup = sum / sumOgCountries;

    $("#statics").html(`
    <div>Total Countries Population ${numberWithCommas(sum)}</div>
    <div>Average Population ${numberWithCommas(avgPup.toFixed(0))}</div>
    `)
    // $("#statics").html(`sum ${sumOgCountries} avg ${numberWithCommas(sum)}`)


}

function drawCountries(arrToDraw) {
    if (!Array.isArray(arrToDraw)) return
    $("#contentTable").html("");
    $("#regionsTable").html("");
    const header = getHeader("Country Name", "Country Population");
    $("#contentTable").append(header)
    const countryRows = arrToDraw.map(function (country) {
        return getRow(country.countryName, country.countyPopulation)
    })
    $("#contentTable").append(...countryRows)

    if (arrToDraw.length === 1) {
        $("#content").css({ height: "85px", overflowY: "auto" })
    } else if (arrToDraw.length > 1) {
        $("#content").css({ height: "400px", overflowY: "scroll" })
    }

    $("#content").css("visibility", "visible")

    clearLoader();
}
function drawRegions(arrToDraw) {
    if (!Array.isArray(arrToDraw)) return

    $("#regionsTable").html("");

    const header = getHeader("Region", "Number of countries");
    $("#regionsTable").append(header)

    const allRegions = [];
    arrToDraw.map(function (country) {
        allRegions.push(country.countryRegion)
    })

    const distinctRegionsObj = {};
    for (let index = 0; index < allRegions.length; index++) {
        distinctRegionsObj[allRegions[index]] = true;
    }

    const distinctRegionsArr = Object.keys(distinctRegionsObj);

    // console.log(_getRegionsData(arrToDraw, distinctRegionsArr));

    const statsArr = _getRegionsData(arrToDraw, distinctRegionsArr);

    for (let index = 0; index < statsArr.length; index++) {
        const currentRow = getRow(statsArr[index].reg, statsArr[index].regSum)
        $("#regionsTable").append(currentRow)
    }

    $("#regionsContent").css("visibility", "visible")


    function _getRegionsData(countriesArr, regArr) {

        if (!Array.isArray(countriesArr) || !Array.isArray(regArr)) return
        const regionsNewArr = [];
        regArr.map(function (r) {
            regionsNewArr.push({ reg: r, regSum: 0 })
        });
        for (let i = 0; i < countriesArr.length; i++) {
            //
            currentCountryRegion = countriesArr[i].countryRegion;

            for (let k = 0; k < regionsNewArr.length; k++) {
                if (regionsNewArr[k].reg === currentCountryRegion) {
                    regionsNewArr[k].regSum++;
                }
            }

        }
        return regionsNewArr

    }

    clearLoader();
}
function drawLoader() {
    clearLoader();
    const loaderDiv = _getLoader()
    $("#loader").append(loaderDiv)

    function _getLoader() {
        const divLoader = document.createElement("div")
        divLoader.className = "loader"
        divLoader.style.height = "100px"
        divLoader.style.width = "100px"
        return divLoader
    }
}
function clearLoader() {
    $("#loader").html("");
}
function invalidCountryPopUp() {
    $("#alertModalError").css("visibility", "visible")
    setTimeout(function () {
        $("#alertModalError").css("visibility", "hidden")
    }, 5000);
}




