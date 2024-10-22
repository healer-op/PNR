let BASE_URL = "https://cors-anywhere.herokuapp.com/https://www.redbus.in/railways/api/getPnrData?pnrno="
let myHeaders = new Headers();
myHeaders.append("origin", "https://www.redbus.in");
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const params = new URLSearchParams(document.location.search);
let PNR = params.get("PNR");





async function getPnrData() {
    if(PNR.length == 10){
        try {
            let data = await (await fetch(`${BASE_URL}${PNR}`,requestOptions)).json();

            let live_status = `https://www.redbus.in/railways/liveTrainDetails?trainNo=${data.trainNumber}&trainName=${encodeURIComponent(data.trainName)}&stn=null&from=LTS%20Home`
            
            document.getElementById("qrimg").src=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(window.location.href)}&size=400x400&color=105-255-107&bgcolor=1a1a1a`
            document.getElementById("pnrNo").innerHTML = data.pnrNo
            document.getElementById("overallStatus").innerHTML = data.overallStatus
            document.getElementById("trainNumber").innerHTML = data.trainNumber
            document.getElementById("trainName").innerHTML = data.trainName
            document.getElementById("duration").innerHTML = `${Math.floor(data.duration / 60)}hrs ${data.duration % 60}m`
            document.getElementById("journeyClass").innerHTML = data.journeyClass
            // document.getElementById("journeyClassName").innerHTML = data.journeyClassName
            document.getElementById("departureTime").innerHTML =  convertDateTime(`${data.departureTime}`)
            document.getElementById("arrivalTime").innerHTML =   convertDateTime(`${data.arrivalTime}`)
            document.getElementById("srcName").innerHTML = data.srcName
            document.getElementById("dstName").innerHTML = data.dstName
            document.getElementById("srcCode").innerHTML = data.srcCode
            document.getElementById("dstCode").innerHTML = data.dstCode
            document.getElementById("srcPfNo").innerHTML = data.srcPfNo
            document.getElementById("dstPfNo").innerHTML = data.dstPfNo
            document.getElementById("chartStatus").innerHTML = data.chartStatus
            document.getElementById("chartPrepMsg").innerHTML = data.chartPrepMsg
            document.getElementById("pnrLastUpdated").innerHTML = data.pnrLastUpdated
            document.getElementById("quota").innerHTML = data.quota
            document.getElementById("runing").href = `${live_status}`

            setInterval(() => {
                document.title = `PNR`
                setTimeout(() => {
                    document.title = `PNR : ${PNR}`
                }, 1000);
            }, 3000);

        } catch (error) {
            document.getElementById("root").innerHTML =""
            document.write(`${error}`);
            console.log(error)
        }
    }else{
        document.getElementById("root").innerHTML =""
        document.write("ERROR PNR SHOULD BE 10");
    }
    
}getPnrData();



function convertDateTime(isoDateTime) {
    // Create a Date object from the ISO 8601 string
    const date = new Date(isoDateTime);
  
    // Format the date and time as desired
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
    // Combine the formatted date and time
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;
  
    return formattedDateTime;
  }