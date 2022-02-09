function getHeader(headerName, headerValue) {

    const tableHeaderRow = document.createElement("tr")

    const tableContentCountryHeader = document.createElement("th")
    tableContentCountryHeader.innerText = headerName;
    const tableContentPupHeader = document.createElement("th")
    tableContentPupHeader.innerText = headerValue;

    tableHeaderRow.append(tableContentCountryHeader, tableContentPupHeader);

    return tableHeaderRow

}

function getRow(name, population) {

    const tableRow = document.createElement("tr")

    const tableContentCountry = document.createElement("td")
    tableContentCountry.innerText = name;
    const tableContentPup = document.createElement("td")
    tableContentPup.innerText = numberWithCommas(population);

    tableRow.append(tableContentCountry, tableContentPup);



    return tableRow

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

{/* <table id="contentTable">
    <tr>
        <th>Country Name</th>
        <th>Country Population</th>
    </tr>
    <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
    </tr>
    <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
    </tr>
</table> */}