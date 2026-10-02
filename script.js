let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const form = document.getElementById("complaintForm");
const table = document.getElementById("complaintTable");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const complaint = {
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        date: document.getElementById("date").value,
        text: document.getElementById("complaint").value,
        status: "Pending"
    };

    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    form.reset();
    displayComplaints();
});

function displayComplaints() {
    table.innerHTML = "";

    let pending = 0;
    let resolved = 0;

    complaints.forEach((c, index) => {
        if (c.status === "Pending") pending++;
        if (c.status === "Resolved") resolved++;

        table.innerHTML += `
            <tr>
                <td>${c.name}</td>
                <td>${c.department}</td>
                <td>${c.date}</td>
                <td>${c.text}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)" class="form-select">
                        <option ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteComplaint(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalCount").innerText = complaints.length;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("resolvedCount").innerText = resolved;
}

function updateStatus(index, status) {
    complaints[index].status = status;
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

function deleteComplaint(index) {
    complaints.splice(index, 1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

displayComplaints();
