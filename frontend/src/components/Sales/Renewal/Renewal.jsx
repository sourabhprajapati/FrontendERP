import React, { useState, useEffect } from "react";
import "./Renewal.css";

const Renewal = () => {

    const schoolData = [
        { name: "Delhi Public School", state: "Delhi", district: "South Delhi" },
        { name: "St. Xavier's High School", state: "Maharashtra", district: "Mumbai City" },
        { name: "Modern School", state: "Delhi", district: "Central Delhi" },
        { name: "Kendriya Vidyalaya", state: "Uttar Pradesh", district: "Lucknow" },
        { name: "Army Public School", state: "Tamil Nadu", district: "Chennai" },
        { name: "The Heritage School", state: "West Bengal", district: "Kolkata" },
        { name: "DAV Public School", state: "Punjab", district: "Chandigarh" },
        { name: "Ryan International School", state: "Karnataka", district: "Bengaluru Urban" },
        { name: "Bharatiya Vidya Bhavan", state: "Gujarat", district: "Ahmedabad" },
    ];


    const statesDistricts = {
        states: [
            { state: "Andhra Pradesh", districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"] },
            { state: "Arunachal Pradesh", districts: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Siang", "Lower Dibang Valley", "Dibang Valley", "Changlang", "Tirap", "Longding", "Namsai", "Pakke-Kessang"] },
            { state: "Assam", districts: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salamara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"] },
            { state: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger (Monghyr)", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"] },
            { state: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada (South Bastar)", "Dhamtari", "Durg", "Gariyaband", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker (North Bastar)", "Kondagaon", "Korba", "Korea (Koriya)", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"] },
            { state: "Delhi", districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"] },
            { state: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda (Nadiad)", "Mahisagar", "Mehsana", "Morbi", "Narmada (Rajpipla)", "Navsari", "Panchmahal (Godhra)", "Patan", "Porbandar", "Rajkot", "Sabarkantha (Himmatnagar)", "Surat", "Surendranagar", "Tapi (Vyara)", "Vadodara", "Valsad"] },
            { state: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
            { state: "Karnataka", districts: ["Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru (Mysore)", "Raichur", "Ramnagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada (Karwar)", "Vijayanagara", "Vijayapura (Bijapur)", "Yadgir"] },
            { state: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
            { state: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
            { state: "Punjab", districts: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"] },
            { state: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"] },
            { state: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"] },
            { state: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },

        ]
    };


    const [form, setForm] = useState({
        salesExecutive: "",
        state: "",
        schoolName: "",
        district: "",
        address: "",
        email: "",
        contactNo: "",
        contactPerson: "",
        selectBoard: "",
        grade: "",
        strength: "",
        noOfStudents: "",
        tpg: false,
        talentBox: false,
        distributor: "Direct Supply",
        consentFile: null,
        loginFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Number fields: only digits, max 10
        if (["strength", "noOfStudents", "contactNo"].includes(name)) {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        // Text fields: no numbers, allow letters, space, . , - ( )
        if (["address", "contactPerson", "grade"].includes(name)) {
            if (!/^[A-Za-z\s\.\,\-\(\)]*$/.test(value)) return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFile = (e, field) => {
        const file = e.target.files?.[0];
        if (file) setForm((prev) => ({ ...prev, [field]: file }));
    };

    const handleDistributor = (e) => {
        setForm((prev) => ({ ...prev, distributor: e.target.value }));
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.contactNo.length !== 10) {
            alert("Contact No must be exactly 10 digits.");
            return;
        }
        if (!form.consentFile || !form.loginFile) {
            alert("Please upload both Consent Form and Login Form.");
            return;
        }
        if (!form.schoolName || form.schoolName === "Select School") {
            alert("Please select a valid School.");
            return;
        }

        console.log("Form submitted:", form);

    };


    const handleSchoolChange = (e) => {
        const selectedSchool = e.target.value;
        setForm((prev) => ({
            ...prev,
            schoolName: selectedSchool,
            state: "",
            district: ""
        }));

        if (selectedSchool && selectedSchool !== "Select School") {
            const schoolInfo = schoolData.find(s => s.name === selectedSchool);
            if (schoolInfo) {
                setForm((prev) => ({
                    ...prev,
                    state: schoolInfo.state,
                    district: schoolInfo.district
                }));
            }
        }
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setForm((prev) => ({
            ...prev,
            state: selectedState,
            district: ""
        }));
    };

    const schoolOptions = ["Select School", ...schoolData.map(s => s.name)];

    const stateOptions = statesDistricts.states.map(s => s.state);
    const currentDistricts = form.state
        ? statesDistricts.states.find(s => s.state === form.state)?.districts || []
        : [];

    return (
        <div className="newschool-container">


            <h1 className="page-title">Renewal School</h1>

            <form onSubmit={handleSubmit} className="newschool-form">
                {/* Row 1: Sales Executive + School Name (Dropdown) */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Sales Executive <span className="required">*</span>
                        </label>
                        <select
                            name="salesExecutive"
                            value={form.salesExecutive}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {/* Add options via API later */}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            School Name <span className="required">*</span>
                        </label>
                        <select
                            name="schoolName"
                            value={form.schoolName}
                            onChange={handleSchoolChange}
                            required
                        >
                            {schoolOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 2: State + District (Auto-populated) */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <select
                            name="state"
                            value={form.state}
                            onChange={handleStateChange}
                            required
                            disabled={!!form.schoolName && form.schoolName !== "Select School"}
                        >
                            <option value="">Select State</option>
                            {stateOptions.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            District <span className="required">*</span>
                        </label>
                        <select
                            name="district"
                            value={form.district}
                            onChange={handleChange}
                            required
                            disabled={!!form.schoolName && form.schoolName !== "Select School"}
                        >
                            <option value="">Select District</option>
                            {currentDistricts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 3: Address + Email */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Address <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Full Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="school@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Row 4: Contact No + Contact Person */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Contact No <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            name="contactNo"
                            value={form.contactNo}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            required
                        />
                        {form.contactNo.length > 0 && form.contactNo.length < 10 && (
                            <small style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                                Must be 10 digits
                            </small>
                        )}
                    </div>
                    <div className="form-group">
                        <label>
                            Contact Person <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="contactPerson"
                            value={form.contactPerson}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                </div>

                {/* Row 5: Board + Grade */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Select Board <span className="required">*</span>
                        </label>
                        <select name="selectBoard" value={form.selectBoard} onChange={handleChange} required>
                            <option value="">Select Board</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            Grade <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            // placeholder="e.g. 1-12"
                            required
                        />
                    </div>
                </div>

                {/* Row 6: Strength + No. of Students */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Strength <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="strength"
                            value={form.strength}
                            onChange={handleChange}
                            maxLength={10}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            No. of Students Enrolled <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="noOfStudents"
                            value={form.noOfStudents}
                            onChange={handleChange}
                            maxLength={10}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label style={{ marginBottom: "0.75rem", display: "block" }}>
                            Features
                        </label>
                        <div className="radio-group" style={{ gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                            <label style={{ fontWeight: "500", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    name="tpg"
                                    checked={form.tpg}
                                    onChange={handleCheckbox}
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                        accentColor: "#2563eb",
                                        cursor: "pointer",
                                        marginRight: "0.5rem",
                                    }}
                                />
                                TPG
                            </label>

                            <label style={{ fontWeight: "500", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    name="talentBox"
                                    checked={form.talentBox}
                                    onChange={handleCheckbox}
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                        accentColor: "#2563eb",
                                        cursor: "pointer",
                                        marginRight: "0.5rem",
                                    }}
                                />
                                Talent Box
                            </label>

                            <a
                                href="/book"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.4rem 0.9rem",
                                    background: "#f3f4f6",
                                    color: "#374151",
                                    border: "1.5px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#e5e7eb";
                                    e.currentTarget.style.borderColor = "#9ca3af";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#f3f4f6";
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                }}
                            >
                                + Add Book
                            </a>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>
                            Distributor <span className="required">*</span>
                        </label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="distributor"
                                    value="Direct Supply"
                                    checked={form.distributor === "Direct Supply"}
                                    onChange={handleDistributor}
                                />
                                Direct Supply
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="distributor"
                                    value="Other Distributor"
                                    checked={form.distributor === "Other Distributor"}
                                    onChange={handleDistributor}
                                />
                                Other Distributor
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-row file-row">
                    <div className="file-group">
                        <label className="file-label">
                            Upload Consent Form <span className="required">*</span>
                        </label>
                        <div className="file-wrapper">
                            <label className="file-btn">
                                + Choose
                                <input
                                    type="file"
                                    accept=".doc,.docx"
                                    onChange={(e) => handleFile(e, "consentFile")}
                                    required
                                />
                            </label>
                            {form.consentFile && (
                                <div className="file-name">
                                    {form.consentFile.name}
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                            color: "#dc2626",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => setForm((prev) => ({ ...prev, consentFile: null }))}
                                    >
                                        ×
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="file-group">
                        <label className="file-label">
                            Upload Login Form (Only .doc or .docx) <span className="required">*</span>
                        </label>
                        <div className="file-wrapper">
                            <label className="file-btn">
                                + Choose
                                <input
                                    type="file"
                                    accept=".doc,.docx"
                                    onChange={(e) => handleFile(e, "loginFile")}
                                    required
                                />
                            </label>
                            {form.loginFile && (
                                <div className="file-name">
                                    {form.loginFile.name}
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                            color: "#dc2626",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => setForm((prev) => ({ ...prev, loginFile: null }))}
                                    >
                                        ×
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="submit-wrapper">
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Renewal;