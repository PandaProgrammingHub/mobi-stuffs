import _ from 'lodash';
const LocationMaster = [
  { name: 'Adilabad' },
  { name: 'Agra' },
  { name: 'Ahmedabad' },
  { name: 'Ahmednagar' },
  { name: 'Aizawl' },
  { name: 'Mohali' },
  { name: 'Ajmer' },
  { name: 'Akola' },
  { name: 'Alappuzha' },
  { name: 'Aligarh' },
  { name: 'Alirajpur' },
  { name: 'Allahabad' },
  { name: 'Almora' },
  { name: 'Alwar' },
  { name: 'Ambala' },
  { name: 'Ambedkar Nagar' },
  { name: 'Amravati' },
  { name: 'Amreli district' },
  { name: 'Amritsar' },
  { name: 'Anand' },
  { name: 'Anantapur' },
  { name: 'Anantnag' },
  { name: 'Angul' },
  { name: 'Anjaw' },
  { name: 'Anuppur' },
  { name: 'Araria' },
  { name: 'Ariyalur' },
  { name: 'Arwal' },
  { name: 'Ashok Nagar' },
  { name: 'Auraiya' },
  { name: 'Aurangabad' },
  { name: 'Aurangabad' },
  { name: 'Azamgarh' },
  { name: 'Badgam' },
  { name: 'Bagalkot' },
  { name: 'Bageshwar' },
  { name: 'Bagpat' },
  { name: 'Bahraich' },
  { name: 'Baksa' },
  { name: 'Balaghat' },
  { name: 'Balangir' },
  { name: 'Balasore' },
  { name: 'Ballia' },
  { name: 'Balrampur' },
  { name: 'Banaskantha' },
  { name: 'Banda' },
  { name: 'Bandipora' },
  { name: 'Bangalore Rural' },
  { name: 'Bangalore Urban' },
  { name: 'Banka' },
  { name: 'Bankura' },
  { name: 'Banswara' },
  { name: 'Barabanki' },
  { name: 'Baramulla' },
  { name: 'Baran' },
  { name: 'Bardhaman' },
  { name: 'Bareilly' },
  { name: 'Bargarh (Baragarh)' },
  { name: 'Barmer' },
  { name: 'Barnala' },
  { name: 'Barpeta' },
  { name: 'Barwani' },
  { name: 'Bastar' },
  { name: 'Basti' },
  { name: 'Bathinda' },
  { name: 'Beed' },
  { name: 'Begusarai' },
  { name: 'Belgaum' },
  { name: 'Bellary' },
  { name: 'Betul' },
  { name: 'Bhadrak' },
  { name: 'Bhagalpur' },
  { name: 'Bhandara' },
  { name: 'Bharatpur' },
  { name: 'Bharuch' },
  { name: 'Bhavnagar' },
  { name: 'Bhilwara' },
  { name: 'Bhind' },
  { name: 'Bhiwani' },
  { name: 'Bhojpur' },
  { name: 'Bhopal' },
  { name: 'Bidar' },
  { name: 'Bijapur' },
  { name: 'Bijapur' },
  { name: 'Bijnor' },
  { name: 'Bikaner' },
  { name: 'Bilaspur' },
  { name: 'Bilaspur' },
  { name: 'Birbhum' },
  { name: 'Bishnupur' },
  { name: 'Bokaro' },
  { name: 'Bongaigaon' },
  { name: 'Boudh (Bauda)' },
  { name: 'Budaun' },
  { name: 'Bulandshahr' },
  { name: 'Buldhana' },
  { name: 'Bundi' },
  { name: 'Burhanpur' },
  { name: 'Buxar' },
  { name: 'Cachar' },
  { name: 'Central Delhi' },
  { name: 'Chamarajnagar' },
  { name: 'Chamba' },
  { name: 'Chamoli' },
  { name: 'Champawat' },
  { name: 'Champhai' },
  { name: 'Chandauli' },
  { name: 'Chandel' },
  { name: 'Chandigarh' },
  { name: 'Chandrapur' },
  { name: 'Changlang' },
  { name: 'Chatra' },
  { name: 'Chennai' },
  { name: 'Chhatarpur' },
  { name: 'Chhatrapati Shahuji Maharaj Nagar' },
  { name: 'Chhindwara' },
  { name: 'Chikkaballapur' },
  { name: 'Chikkamagaluru' },
  { name: 'Chirang' },
  { name: 'Chitradurga' },
  { name: 'Chitrakoot' },
  { name: 'Chittoor' },
  { name: 'Chittorgarh' },
  { name: 'Churachandpur' },
  { name: 'Churu' },
  { name: 'Coimbatore' },
  { name: 'Cooch Behar' },
  { name: 'Cuddalore' },
  { name: 'Cuttack' },
  { name: 'Dadra and Nagar Haveli' },
  { name: 'Dahod' },
  { name: 'Dakshin Dinajpur' },
  { name: 'Dakshina Kannada' },
  { name: 'Daman' },
  { name: 'Damoh' },
  { name: 'Dantewada' },
  { name: 'Darbhanga' },
  { name: 'Darjeeling' },
  { name: 'Darrang' },
  { name: 'Datia' },
  { name: 'Dausa' },
  { name: 'Davanagere' },
  { name: 'Debagarh (Deogarh)' },
  { name: 'Dehradun' },
  { name: 'Deoghar' },
  { name: 'Deoria' },
  { name: 'Dewas' },
  { name: 'Dhalai' },
  { name: 'Dhamtari' },
  { name: 'Dhanbad' },
  { name: 'Dhar' },
  { name: 'Dharmapuri' },
  { name: 'Dharwad' },
  { name: 'Dhemaji' },
  { name: 'Dhenkanal' },
  { name: 'Dholpur' },
  { name: 'Dhubri' },
  { name: 'Dhule' },
  { name: 'Dibang Valley' },
  { name: 'Dibrugarh' },
  { name: 'Dima Hasao' },
  { name: 'Dimapur' },
  { name: 'Dindigul' },
  { name: 'Dindori' },
  { name: 'Diu' },
  { name: 'Doda' },
  { name: 'Dumka' },
  { name: 'Dungapur' },
  { name: 'Durg' },
  { name: 'East Champaran' },
  { name: 'East Delhi' },
  { name: 'East Garo Hills' },
  { name: 'East Khasi Hills' },
  { name: 'East Siang' },
  { name: 'East Sikkim' },
  { name: 'East Singhbhum' },
  { name: 'Eluru' },
  { name: 'Ernakulam' },
  { name: 'Erode' },
  { name: 'Etah' },
  { name: 'Etawah' },
  { name: 'Faizabad' },
  { name: 'Faridabad' },
  { name: 'Faridkot' },
  { name: 'Farrukhabad' },
  { name: 'Fatehabad' },
  { name: 'Fatehgarh Sahib' },
  { name: 'Fatehpur' },
  { name: 'Fazilka' },
  { name: 'Firozabad' },
  { name: 'Firozpur' },
  { name: 'Gadag' },
  { name: 'Gadchiroli' },
  { name: 'Gajapati' },
  { name: 'Ganderbal' },
  { name: 'Gandhinagar' },
  { name: 'Ganganagar' },
  { name: 'Ganjam' },
  { name: 'Garhwa' },
  { name: 'Gautam Buddh Nagar' },
  { name: 'Gaya' },
  { name: 'Ghaziabad' },
  { name: 'Ghazipur' },
  { name: 'Giridih' },
  { name: 'Goalpara' },
  { name: 'Godda' },
  { name: 'Golaghat' },
  { name: 'Gonda' },
  { name: 'Gondia' },
  { name: 'Gopalganj' },
  { name: 'Gorakhpur' },
  { name: 'Gulbarga' },
  { name: 'Gumla' },
  { name: 'Guna' },
  { name: 'Guntur' },
  { name: 'Gurdaspur' },
  { name: 'Gurgaon' },
  { name: 'Gwalior' },
  { name: 'Hailakandi' },
  { name: 'Hamirpur' },
  { name: 'Hamirpur' },
  { name: 'Hanumangarh' },
  { name: 'Harda' },
  { name: 'Hardoi' },
  { name: 'Haridwar' },
  { name: 'Hassan' },
  { name: 'Haveri district' },
  { name: 'Hazaribag' },
  { name: 'Hingoli' },
  { name: 'Hissar' },
  { name: 'Hooghly' },
  { name: 'Hoshangabad' },
  { name: 'Hoshiarpur' },
  { name: 'Howrah' },
  { name: 'Hyderabad' },
  { name: 'Hyderabad' },
  { name: 'Idukki' },
  { name: 'Imphal East' },
  { name: 'Imphal West' },
  { name: 'Indore' },
  { name: 'Jabalpur' },
  { name: 'Jagatsinghpur' },
  { name: 'Jaintia Hills' },
  { name: 'Jaipur' },
  { name: 'Jaisalmer' },
  { name: 'Jajpur' },
  { name: 'Jalandhar' },
  { name: 'Jalaun' },
  { name: 'Jalgaon' },
  { name: 'Jalna' },
  { name: 'Jalore' },
  { name: 'Jalpaiguri' },
  { name: 'Jammu' },
  { name: 'Jamnagar' },
  { name: 'Jamtara' },
  { name: 'Jamui' },
  { name: 'Janjgir-Champa' },
  { name: 'Jashpur' },
  { name: 'Jaunpur district' },
  { name: 'Jehanabad' },
  { name: 'Jhabua' },
  { name: 'Jhajjar' },
  { name: 'Jhalawar' },
  { name: 'Jhansi' },
  { name: 'Jharsuguda' },
  { name: 'Jhunjhunu' },
  { name: 'Jind' },
  { name: 'Jodhpur' },
  { name: 'Jorhat' },
  { name: 'Junagadh' },
  { name: 'Jyotiba Phule Nagar' },
  { name: 'Kabirdham (formerly Kawardha)' },
  { name: 'Kadapa' },
  { name: 'Kaimur' },
  { name: 'Kaithal' },
  { name: 'Kakinada' },
  { name: 'Kalahandi' },
  { name: 'Kamrup' },
  { name: 'Kamrup Metropolitan' },
  { name: 'Kanchipuram' },
  { name: 'Kandhamal' },
  { name: 'Kangra' },
  { name: 'Kanker' },
  { name: 'Kannauj' },
  { name: 'Kannur' },
  { name: 'Kanpur' },
  { name: 'Kanshi Ram Nagar' },
  { name: 'Kanyakumari' },
  { name: 'Kapurthala' },
  { name: 'Karaikal' },
  { name: 'Karauli' },
  { name: 'Karbi Anglong' },
  { name: 'Kargil' },
  { name: 'Karimganj' },
  { name: 'Karimnagar' },
  { name: 'Karnal' },
  { name: 'Karur' },
  { name: 'Kasaragod' },
  { name: 'Kathua' },
  { name: 'Katihar' },
  { name: 'Katni' },
  { name: 'Kaushambi' },
  { name: 'Kendrapara' },
  { name: 'Kendujhar (Keonjhar)' },
  { name: 'Khagaria' },
  { name: 'Khammam' },
  { name: 'Khandwa (East Nimar)' },
  { name: 'Khargone (West Nimar)' },
  { name: 'Kheda' },
  { name: 'Khordha' },
  { name: 'Khowai' },
  { name: 'Khunti' },
  { name: 'Kinnaur' },
  { name: 'Kishanganj' },
  { name: 'Kishtwar' },
  { name: 'Kodagu' },
  { name: 'Koderma' },
  { name: 'Kohima' },
  { name: 'Kokrajhar' },
  { name: 'Kolar' },
  { name: 'Kolasib' },
  { name: 'Kolhapur' },
  { name: 'Kolkata' },
  { name: 'Kollam' },
  { name: 'Koppal' },
  { name: 'Koraput' },
  { name: 'Korba' },
  { name: 'Koriya' },
  { name: 'Kota' },
  { name: 'Kottayam' },
  { name: 'Kozhikode' },
  { name: 'Krishna' },
  { name: 'Kulgam' },
  { name: 'Kullu' },
  { name: 'Kupwara' },
  { name: 'Kurnool' },
  { name: 'Kurukshetra' },
  { name: 'Kurung Kumey' },
  { name: 'Kushinagar' },
  { name: 'Kutch' },
  { name: 'Lahaul and Spiti' },
  { name: 'Lakhimpur' },
  { name: 'Lakhimpur Kheri' },
  { name: 'Lakhisarai' },
  { name: 'Lalitpur' },
  { name: 'Latehar' },
  { name: 'Latur' },
  { name: 'Lawngtlai' },
  { name: 'Leh' },
  { name: 'Lohardaga' },
  { name: 'Lohit' },
  { name: 'Lower Dibang Valley' },
  { name: 'Lower Subansiri' },
  { name: 'Lucknow' },
  { name: 'Ludhiana' },
  { name: 'Lunglei' },
  { name: 'Madhepura' },
  { name: 'Madhubani' },
  { name: 'Madurai' },
  { name: 'Mahamaya Nagar' },
  { name: 'Maharajganj' },
  { name: 'Mahasamund' },
  { name: 'Mahbubnagar' },
  { name: 'Mahe' },
  { name: 'Mahendragarh' },
  { name: 'Mahoba' },
  { name: 'Mainpuri' },
  { name: 'Malappuram' },
  { name: 'Maldah' },
  { name: 'Malkangiri' },
  { name: 'Mamit' },
  { name: 'Mandi' },
  { name: 'Mandla' },
  { name: 'Mandsaur' },
  { name: 'Mandya' },
  { name: 'Mansa' },
  { name: 'Marigaon' },
  { name: 'Mathura' },
  { name: 'Mau' },
  { name: 'Mayurbhanj' },
  { name: 'Medak' },
  { name: 'Meerut' },
  { name: 'Mehsana' },
  { name: 'Mewat' },
  { name: 'Mirzapur' },
  { name: 'Moga' },
  { name: 'Mokokchung' },
  { name: 'Mon' },
  { name: 'Moradabad' },
  { name: 'Morena' },
  { name: 'Mumbai City' },
  { name: 'Mumbai suburban' },
  { name: 'Munger' },
  { name: 'Murshidabad' },
  { name: 'Muzaffarnagar' },
  { name: 'Muzaffarpur' },
  { name: 'Mysore' },
  { name: 'Nabarangpur' },
  { name: 'Nadia' },
  { name: 'Nagaon' },
  { name: 'Nagapattinam' },
  { name: 'Nagaur' },
  { name: 'Nagpur' },
  { name: 'Nainital' },
  { name: 'Nalanda' },
  { name: 'Nalbari' },
  { name: 'Nalgonda' },
  { name: 'Namakkal' },
  { name: 'Nanded' },
  { name: 'Nandurbar' },
  { name: 'Narayanpur' },
  { name: 'Narmada' },
  { name: 'Narsinghpur' },
  { name: 'Nashik' },
  { name: 'Navsari' },
  { name: 'Nawada' },
  { name: 'Nawanshahr' },
  { name: 'Nayagarh' },
  { name: 'Neemuch' },
  { name: 'Nellore' },
  { name: 'New Delhi' },
  { name: 'Nilgiris' },
  { name: 'Nizamabad' },
  { name: 'North 24 Parganas' },
  { name: 'North Delhi' },
  { name: 'North East Delhi' },
  { name: 'North Goa' },
  { name: 'North Sikkim' },
  { name: 'North Tripura' },
  { name: 'North West Delhi' },
  { name: 'Nuapada' },
  { name: 'Ongole' },
  { name: 'Osmanabad' },
  { name: 'Pakur' },
  { name: 'Palakkad' },
  { name: 'Palamu' },
  { name: 'Pali' },
  { name: 'Palwal' },
  { name: 'Panchkula' },
  { name: 'Panchmahal' },
  { name: 'Panchsheel Nagar district (Hapur)' },
  { name: 'Panipat' },
  { name: 'Panna' },
  { name: 'Papum Pare' },
  { name: 'Parbhani' },
  { name: 'Paschim Medinipur' },
  { name: 'Patan' },
  { name: 'Pathanamthitta' },
  { name: 'Pathankot' },
  { name: 'Patiala' },
  { name: 'Patna' },
  { name: 'Pauri Garhwal' },
  { name: 'Perambalur' },
  { name: 'Phek' },
  { name: 'Pilibhit' },
  { name: 'Pithoragarh' },
  { name: 'Pondicherry' },
  { name: 'Poonch' },
  { name: 'Porbandar' },
  { name: 'Pratapgarh' },
  { name: 'Pratapgarh' },
  { name: 'Pudukkottai' },
  { name: 'Pulwama' },
  { name: 'Pune' },
  { name: 'Purba Medinipur' },
  { name: 'Puri' },
  { name: 'Purnia' },
  { name: 'Purulia' },
  { name: 'Raebareli' },
  { name: 'Raichur' },
  { name: 'Raigad' },
  { name: 'Raigarh' },
  { name: 'Raipur' },
  { name: 'Raisen' },
  { name: 'Rajauri' },
  { name: 'Rajgarh' },
  { name: 'Rajkot' },
  { name: 'Rajnandgaon' },
  { name: 'Rajsamand' },
  { name: 'Ramabai Nagar (Kanpur Dehat)' },
  { name: 'Ramanagara' },
  { name: 'Ramanathapuram' },
  { name: 'Ramban' },
  { name: 'Ramgarh' },
  { name: 'Rampur' },
  { name: 'Ranchi' },
  { name: 'Ratlam' },
  { name: 'Ratnagiri' },
  { name: 'Rayagada' },
  { name: 'Reasi' },
  { name: 'Rewa' },
  { name: 'Rewari' },
  { name: 'Ri Bhoi' },
  { name: 'Rohtak' },
  { name: 'Rohtas' },
  { name: 'Rudraprayag' },
  { name: 'Rupnagar' },
  { name: 'Sabarkantha' },
  { name: 'Sagar' },
  { name: 'Saharanpur' },
  { name: 'Saharsa' },
  { name: 'Sahibganj' },
  { name: 'Saiha' },
  { name: 'Salem' },
  { name: 'Samastipur' },
  { name: 'Samba' },
  { name: 'Sambalpur' },
  { name: 'Sangli' },
  { name: 'Sangrur' },
  { name: 'Sant Kabir Nagar' },
  { name: 'Sant Ravidas Nagar' },
  { name: 'Saran' },
  { name: 'Satara' },
  { name: 'Satna' },
  { name: 'Sawai Madhopur' },
  { name: 'Sehore' },
  { name: 'Senapati' },
  { name: 'Seoni' },
  { name: 'Seraikela Kharsawan' },
  { name: 'Serchhip' },
  { name: 'Shahdol' },
  { name: 'Shahjahanpur' },
  { name: 'Shajapur' },
  { name: 'Shamli' },
  { name: 'Sheikhpura' },
  { name: 'Sheohar' },
  { name: 'Sheopur' },
  { name: 'Shimla' },
  { name: 'Shimoga' },
  { name: 'Shivpuri' },
  { name: 'Shopian' },
  { name: 'Shravasti' },
  { name: 'Sibsagar' },
  { name: 'Siddharthnagar' },
  { name: 'Sidhi' },
  { name: 'Sikar' },
  { name: 'Simdega' },
  { name: 'Sindhudurg' },
  { name: 'Singrauli' },
  { name: 'Sirmaur' },
  { name: 'Sirohi' },
  { name: 'Sirsa' },
  { name: 'Sitamarhi' },
  { name: 'Sitapur' },
  { name: 'Sivaganga' },
  { name: 'Siwan' },
  { name: 'Solan' },
  { name: 'Solapur' },
  { name: 'Sonbhadra' },
  { name: 'Sonipat' },
  { name: 'Sonitpur' },
  { name: 'South 24 Parganas' },
  { name: 'South Delhi' },
  { name: 'South Garo Hills' },
  { name: 'South Goa' },
  { name: 'South Sikkim' },
  { name: 'South Tripura' },
  { name: 'South West Delhi' },
  { name: 'Sri Muktsar Sahib' },
  { name: 'Srikakulam' },
  { name: 'Srinagar' },
  { name: 'Subarnapur (Sonepur)' },
  { name: 'Sultanpur' },
  { name: 'Sundergarh' },
  { name: 'Supaul' },
  { name: 'Surat' },
  { name: 'Surendranagar' },
  { name: 'Surguja' },
  { name: 'Tamenglong' },
  { name: 'Tarn Taran' },
  { name: 'Tawang' },
  { name: 'Tehri Garhwal' },
  { name: 'Thane' },
  { name: 'Thanjavur' },
  { name: 'The Dangs' },
  { name: 'Theni' },
  { name: 'Thiruvananthapuram' },
  { name: 'Thoothukudi' },
  { name: 'Thoubal' },
  { name: 'Thrissur' },
  { name: 'Tikamgarh' },
  { name: 'Tinsukia' },
  { name: 'Tirap' },
  { name: 'Tiruchirappalli' },
  { name: 'Tirunelveli' },
  { name: 'Tirupur' },
  { name: 'Tiruvallur' },
  { name: 'Tiruvannamalai' },
  { name: 'Tiruvarur' },
  { name: 'Tonk' },
  { name: 'Tuensang' },
  { name: 'Tumkur' },
  { name: 'Udaipur' },
  { name: 'Udalguri' },
  { name: 'Udham Singh Nagar' },
  { name: 'Udhampur' },
  { name: 'Udupi' },
  { name: 'Ujjain' },
  { name: 'Ukhrul' },
  { name: 'Umaria' },
  { name: 'Una' },
  { name: 'Unnao' },
  { name: 'Upper Siang' },
  { name: 'Upper Subansiri' },
  { name: 'Uttar Dinajpur' },
  { name: 'Uttara Kannada' },
  { name: 'Uttarkashi' },
  { name: 'Vadodara' },
  { name: 'Vaishali' },
  { name: 'Valsad' },
  { name: 'Varanasi' },
  { name: 'Vellore' },
  { name: 'Vidisha' },
  { name: 'Viluppuram' },
  { name: 'Virudhunagar' },
  { name: 'Visakhapatnam' },
  { name: 'Vizianagaram' },
  { name: 'Vyara' },
  { name: 'Warangal' },
  { name: 'Wardha' },
  { name: 'Washim' },
  { name: 'Wayanad' },
  { name: 'West Champaran' },
  { name: 'West Delhi' },
  { name: 'West Garo Hills' },
  { name: 'West Kameng' },
  { name: 'West Khasi Hills' },
  { name: 'West Siang' },
  { name: 'West Sikkim' },
  { name: 'West Singhbhum' },
  { name: 'West Tripura' },
  { name: 'Wokha' },
  { name: 'Yadgir' },
  { name: 'Yamuna Nagar' },
  { name: 'Yanam' },
  { name: 'Yavatmal' },
  { name: 'Zunheboto' },
  { name: 'New York, New York' },
  { name: 'Los Angeles, California' },
  { name: 'Chicago, Illinois' },
  { name: 'Houston, Texas' },
  { name: 'Phoenix, Arizona' },
  { name: 'Philadelphia, Pennsylvania' },
  { name: 'San Antonio, Texas' },
  { name: 'San Diego, California' },
  { name: 'Dallas, Texas' },
  { name: 'San Jose, California' },
  { name: 'Austin, Texas' },
  { name: 'Jacksonville, Florida' },
  { name: 'San Francisco, California' },
  { name: 'Columbus, Ohio' },
  { name: 'Indianapolis, Indiana' },
  { name: 'Fort Worth, Texas' },
  { name: 'Charlotte, North Carolina' },
  { name: 'Seattle, Washington' },
  { name: 'Denver, Colorado' },
  { name: 'El Paso, Texas' },
  { name: 'Washington, District of Columbia' },
  { name: 'Boston, Massachusetts' },
  { name: 'Detroit, Michigan' },
  { name: 'Nashville, Tennessee' },
  { name: 'Memphis, Tennessee' },
  { name: 'Portland, Oregon' },
  { name: 'Oklahoma City, Oklahoma' },
  { name: 'Las Vegas, Nevada' },
  { name: 'Louisville, Kentucky' },
  { name: 'Baltimore, Maryland' },
  { name: 'Milwaukee, Wisconsin' },
  { name: 'Albuquerque, New Mexico' },
  { name: 'Tucson, Arizona' },
  { name: 'Fresno, California' },
  { name: 'Sacramento, California' },
  { name: 'Mesa, Arizona' },
  { name: 'Kansas City, Missouri' },
  { name: 'Atlanta, Georgia' },
  { name: 'Long Beach, California' },
  { name: 'Colorado Springs, Colorado' },
  { name: 'Raleigh, North Carolina' },
  { name: 'Miami, Florida' },
  { name: 'Virginia Beach, Virginia' },
  { name: 'Omaha, Nebraska' },
  { name: 'Oakland, California' },
  { name: 'Minneapolis, Minnesota' },
  { name: 'Tulsa, Oklahoma' },
  { name: 'Arlington, Texas' },
  { name: 'New Orleans, Louisiana' },
  { name: 'Wichita, Kansas' },
  { name: 'Cleveland, Ohio' },
  { name: 'Tampa, Florida' },
  { name: 'Bakersfield, California' },
  { name: 'Aurora, Colorado' },
  { name: 'Honolulu, Hawaii' },
  { name: 'Anaheim, California' },
  { name: 'Santa Ana, California' },
  { name: 'Corpus Christi, Texas' },
  { name: 'Riverside, California' },
  { name: 'Lexington, Kentucky' },
  { name: 'St. Louis, Missouri' },
  { name: 'Stockton, California' },
  { name: 'Pittsburgh, Pennsylvania' },
  { name: 'Saint Paul, Minnesota' },
  { name: 'Cincinnati, Ohio' },
  { name: 'Anchorage, Alaska' },
  { name: 'Henderson, Nevada' },
  { name: 'Greensboro, North Carolina' },
  { name: 'Plano, Texas' },
  { name: 'Newark, New Jersey' },
  { name: 'Lincoln, Nebraska' },
  { name: 'Toledo, Ohio' },
  { name: 'Orlando, Florida' },
  { name: 'Chula Vista, California' },
  { name: 'Irvine, California' },
  { name: 'Fort Wayne, Indiana' },
  { name: 'Jersey City, New Jersey' },
  { name: 'Durham, North Carolina' },
  { name: 'St. Petersburg, Florida' },
  { name: 'Laredo, Texas' },
  { name: 'Buffalo, New York' },
  { name: 'Madison, Wisconsin' },
  { name: 'Lubbock, Texas' },
  { name: 'Chandler, Arizona' },
  { name: 'Scottsdale, Arizona' },
  { name: 'Glendale, Arizona' },
  { name: 'Reno, Nevada' },
  { name: 'Norfolk, Virginia' },
  { name: 'Winston-Salem, North Carolina' },
  { name: 'North Las Vegas, Nevada' },
  { name: 'Irving, Texas' },
  { name: 'Chesapeake, Virginia' },
  { name: 'Gilbert, Arizona' },
  { name: 'Hialeah, Florida' },
  { name: 'Garland, Texas' },
  { name: 'Fremont, California' },
  { name: 'Baton Rouge, Louisiana' },
  { name: 'Richmond, Virginia' },
  { name: 'Boise, Idaho' },
  { name: 'San Bernardino, California' },
  { name: 'Spokane, Washington' },
  { name: 'Des Moines, Iowa' },
  { name: 'Modesto, California' },
  { name: 'Birmingham, Alabama' },
  { name: 'Tacoma, Washington' },
  { name: 'Fontana, California' },
  { name: 'Rochester, New York' },
  { name: 'Oxnard, California' },
  { name: 'Moreno Valley, California' },
  { name: 'Fayetteville, North Carolina' },
  { name: 'Aurora, Illinois' },
  { name: 'Glendale, California' },
  { name: 'Yonkers, New York' },
  { name: 'Huntington Beach, California' },
  { name: 'Montgomery, Alabama' },
  { name: 'Amarillo, Texas' },
  { name: 'Little Rock, Arkansas' },
  { name: 'Akron, Ohio' },
  { name: 'Columbus, Georgia' },
  { name: 'Augusta, Georgia' },
  { name: 'Grand Rapids, Michigan' },
  { name: 'Shreveport, Louisiana' },
  { name: 'Salt Lake City, Utah' },
  { name: 'Huntsville, Alabama' },
  { name: 'Mobile, Alabama' },
  { name: 'Tallahassee, Florida' },
  { name: 'Grand Prairie, Texas' },
  { name: 'Overland Park, Kansas' },
  { name: 'Knoxville, Tennessee' },
  { name: 'Port St. Lucie, Florida' },
  { name: 'Worcester, Massachusetts' },
  { name: 'Brownsville, Texas' },
  { name: 'Tempe, Arizona' },
  { name: 'Santa Clarita, California' },
  { name: 'Newport News, Virginia' },
  { name: 'Cape Coral, Florida' },
  { name: 'Providence, Rhode Island' },
  { name: 'Fort Lauderdale, Florida' },
  { name: 'Chattanooga, Tennessee' },
  { name: 'Rancho Cucamonga, California' },
  { name: 'Oceanside, California' },
  { name: 'Santa Rosa, California' },
  { name: 'Garden Grove, California' },
  { name: 'Vancouver, Washington' },
  { name: 'Sioux Falls, South Dakota' },
  { name: 'Ontario, California' },
  { name: 'McKinney, Texas' },
  { name: 'Elk Grove, California' },
  { name: 'Jackson, Mississippi' },
  { name: 'Pembroke Pines, Florida' },
  { name: 'Salem, Oregon' },
  { name: 'Springfield, Missouri' },
  { name: 'Corona, California' },
  { name: 'Eugene, Oregon' },
  { name: 'Fort Collins, Colorado' },
  { name: 'Peoria, Arizona' },
  { name: 'Frisco, Texas' },
  { name: 'Cary, North Carolina' },
  { name: 'Lancaster, California' },
  { name: 'Hayward, California' },
  { name: 'Palmdale, California' },
  { name: 'Salinas, California' },
  { name: 'Alexandria, Virginia' },
  { name: 'Lakewood, Colorado' },
  { name: 'Springfield, Massachusetts' },
  { name: 'Pasadena, Texas' },
  { name: 'Sunnyvale, California' },
  { name: 'Macon, Georgia' },
  { name: 'Pomona, California' },
  { name: 'Hollywood, Florida' },
  { name: 'Kansas City, Kansas' },
  { name: 'Escondido, California' },
  { name: 'Clarksville, Tennessee' },
  { name: 'Joliet, Illinois' },
  { name: 'Rockford, Illinois' },
  { name: 'Torrance, California' },
  { name: 'Naperville, Illinois' },
  { name: 'Paterson, New Jersey' },
  { name: 'Savannah, Georgia' },
  { name: 'Bridgeport, Connecticut' },
  { name: 'Mesquite, Texas' },
  { name: 'Killeen, Texas' },
  { name: 'Syracuse, New York' },
  { name: 'McAllen, Texas' },
  { name: 'Pasadena, California' },
  { name: 'Bellevue, Washington' },
  { name: 'Fullerton, California' },
  { name: 'Orange, California' },
  { name: 'Dayton, Ohio' },
  { name: 'Miramar, Florida' },
  { name: 'Thornton, Colorado' },
  { name: 'West Valley City, Utah' },
  { name: 'Olathe, Kansas' },
  { name: 'Hampton, Virginia' },
  { name: 'Warren, Michigan' },
  { name: 'Midland, Texas' },
  { name: 'Waco, Texas' },
  { name: 'Charleston, South Carolina' },
  { name: 'Columbia, South Carolina' },
  { name: 'Denton, Texas' },
  { name: 'Carrollton, Texas' },
  { name: 'Surprise, Arizona' },
  { name: 'Roseville, California' },
  { name: 'Sterling Heights, Michigan' },
  { name: 'Murfreesboro, Tennessee' },
  { name: 'Gainesville, Florida' },
  { name: 'Cedar Rapids, Iowa' },
  { name: 'Visalia, California' },
  { name: 'Coral Springs, Florida' },
  { name: 'New Haven, Connecticut' },
  { name: 'Stamford, Connecticut' },
  { name: 'Thousand Oaks, California' },
  { name: 'Concord, California' },
  { name: 'Elizabeth, New Jersey' },
  { name: 'Lafayette, Louisiana' },
  { name: 'Kent, Washington' },
  { name: 'Topeka, Kansas' },
  { name: 'Simi Valley, California' },
  { name: 'Santa Clara, California' },
  { name: 'Athens, Georgia' },
  { name: 'Hartford, Connecticut' },
  { name: 'Victorville, California' },
  { name: 'Abilene, Texas' },
  { name: 'Norman, Oklahoma' },
  { name: 'Vallejo, California' },
  { name: 'Berkeley, California' },
  { name: 'Round Rock, Texas' },
  { name: 'Ann Arbor, Michigan' },
  { name: 'Fargo, North Dakota' },
  { name: 'Columbia, Missouri' },
  { name: 'Allentown, Pennsylvania' },
  { name: 'Evansville, Indiana' },
  { name: 'Beaumont, Texas' },
  { name: 'Odessa, Texas' },
  { name: 'Wilmington, North Carolina' },
  { name: 'Arvada, Colorado' },
  { name: 'Independence, Missouri' },
  { name: 'Provo, Utah' },
  { name: 'Lansing, Michigan' },
  { name: 'El Monte, California' },
  { name: 'Springfield, Illinois' },
  { name: 'Fairfield, California' },
  { name: 'Clearwater, Florida' },
  { name: 'Peoria, Illinois' },
  { name: 'Rochester, Minnesota' },
  { name: 'Carlsbad, California' },
  { name: 'Westminster, Colorado' },
  { name: 'West Jordan, Utah' },
  { name: 'Pearland, Texas' },
  { name: 'Richardson, Texas' },
  { name: 'Downey, California' },
  { name: 'Miami Gardens, Florida' },
  { name: 'Temecula, California' },
  { name: 'Costa Mesa, California' },
  { name: 'College Station, Texas' },
  { name: 'Elgin, Illinois' },
  { name: 'Murrieta, California' },
  { name: 'Gresham, Oregon' },
  { name: 'High Point, North Carolina' },
  { name: 'Antioch, California' },
  { name: 'Inglewood, California' },
  { name: 'Cambridge, Massachusetts' },
  { name: 'Lowell, Massachusetts' },
  { name: 'Manchester, New Hampshire' },
  { name: 'Billings, Montana' },
  { name: 'Pueblo, Colorado' },
  { name: 'Palm Bay, Florida' },
  { name: 'Centennial, Colorado' },
  { name: 'Richmond, California' },
  { name: 'Ventura, California' },
  { name: 'Pompano Beach, Florida' },
  { name: 'North Charleston, South Carolina' },
  { name: 'Everett, Washington' },
  { name: 'Waterbury, Connecticut' },
  { name: 'West Palm Beach, Florida' },
  { name: 'Boulder, Colorado' },
  { name: 'West Covina, California' },
  { name: 'Broken Arrow, Oklahoma' },
  { name: 'Clovis, California' },
  { name: 'Daly City, California' },
  { name: 'Lakeland, Florida' },
  { name: 'Santa Maria, California' },
  { name: 'Norwalk, California' },
  { name: 'Sandy Springs, Georgia' },
  { name: 'Hillsboro, Oregon' },
  { name: 'Green Bay, Wisconsin' },
  { name: 'Tyler, Texas' },
  { name: 'Wichita Falls, Texas' },
  { name: 'Lewisville, Texas' },
  { name: 'Burbank, California' },
  { name: 'Greeley, Colorado' },
  { name: 'San Mateo, California' },
  { name: 'El Cajon, California' },
  { name: 'Jurupa Valley, California' },
  { name: 'Rialto, California' },
  { name: 'Davenport, Iowa' },
  { name: 'League City, Texas' },
  { name: 'Edison, New Jersey' },
  { name: 'Davie, Florida' },
  { name: 'Las Cruces, New Mexico' },
  { name: 'South Bend, Indiana' },
  { name: 'Vista, California' },
  { name: 'Woodbridge, New Jersey' },
  { name: 'Renton, Washington' },
  { name: 'Lakewood, New Jersey' },
  { name: 'San Angelo, Texas' },
  { name: 'Clinton, Michigan' },
  { name: 'Other, USA' },
  { name: 'Other, India' },
  { name: 'Afghanistan ' },
  { name: 'Albania ' },
  { name: 'Algeria ' },
  { name: 'American Samoa ' },
  { name: 'Andorra ' },
  { name: 'Angola ' },
  { name: 'Anguilla ' },
  { name: 'Antigua & Barbuda ' },
  { name: 'Argentina ' },
  { name: 'Armenia ' },
  { name: 'Aruba ' },
  { name: 'Australia ' },
  { name: 'Austria ' },
  { name: 'Azerbaijan ' },
  { name: 'Bahamas, The ' },
  { name: 'Bahrain ' },
  { name: 'Bangladesh ' },
  { name: 'Barbados ' },
  { name: 'Belarus ' },
  { name: 'Belgium ' },
  { name: 'Belize ' },
  { name: 'Benin ' },
  { name: 'Bermuda ' },
  { name: 'Bhutan ' },
  { name: 'Bolivia ' },
  { name: 'Bosnia & Herzegovina ' },
  { name: 'Botswana ' },
  { name: 'Brazil ' },
  { name: 'British Virgin Is. ' },
  { name: 'Brunei ' },
  { name: 'Bulgaria ' },
  { name: 'Burkina Faso ' },
  { name: 'Burma ' },
  { name: 'Burundi ' },
  { name: 'Cambodia ' },
  { name: 'Cameroon ' },
  { name: 'Canada ' },
  { name: 'Cape Verde ' },
  { name: 'Cayman Islands ' },
  { name: 'Central African Rep. ' },
  { name: 'Chad ' },
  { name: 'Chile ' },
  { name: 'China ' },
  { name: 'Colombia ' },
  { name: 'Comoros ' },
  { name: 'Congo, Dem. Rep. ' },
  { name: 'Congo, Repub. of the ' },
  { name: 'Cook Islands ' },
  { name: 'Costa Rica ' },
  { name: 'Cote d\'Ivoire ' },
  { name: 'Croatia ' },
  { name: 'Cuba ' },
  { name: 'Cyprus ' },
  { name: 'Czech Republic ' },
  { name: 'Denmark ' },
  { name: 'Djibouti ' },
  { name: 'Dominica ' },
  { name: 'Dominican Republic ' },
  { name: 'East Timor ' },
  { name: 'Ecuador ' },
  { name: 'Egypt ' },
  { name: 'El Salvador ' },
  { name: 'Equatorial Guinea ' },
  { name: 'Eritrea ' },
  { name: 'Estonia ' },
  { name: 'Ethiopia ' },
  { name: 'Faroe Islands ' },
  { name: 'Fiji ' },
  { name: 'Finland ' },
  { name: 'France ' },
  { name: 'French Guiana ' },
  { name: 'French Polynesia ' },
  { name: 'Gabon ' },
  { name: 'Gambia, The ' },
  { name: 'Gaza Strip ' },
  { name: 'Georgia ' },
  { name: 'Germany ' },
  { name: 'Ghana ' },
  { name: 'Gibraltar ' },
  { name: 'Greece ' },
  { name: 'Greenland ' },
  { name: 'Grenada ' },
  { name: 'Guadeloupe ' },
  { name: 'Guam ' },
  { name: 'Guatemala ' },
  { name: 'Guernsey ' },
  { name: 'Guinea ' },
  { name: 'Guinea-Bissau ' },
  { name: 'Guyana ' },
  { name: 'Haiti ' },
  { name: 'Honduras ' },
  { name: 'Hong Kong ' },
  { name: 'Hungary ' },
  { name: 'Iceland ' },
  { name: 'Indonesia ' },
  { name: 'Iran ' },
  { name: 'Iraq ' },
  { name: 'Ireland ' },
  { name: 'Isle of Man ' },
  { name: 'Israel ' },
  { name: 'Italy ' },
  { name: 'Jamaica ' },
  { name: 'Japan ' },
  { name: 'Jersey ' },
  { name: 'Jordan ' },
  { name: 'Kazakhstan ' },
  { name: 'Kenya ' },
  { name: 'Kiribati ' },
  { name: 'Korea, North ' },
  { name: 'Korea, South ' },
  { name: 'Kuwait ' },
  { name: 'Kyrgyzstan ' },
  { name: 'Laos ' },
  { name: 'Latvia ' },
  { name: 'Lebanon ' },
  { name: 'Lesotho ' },
  { name: 'Liberia ' },
  { name: 'Libya ' },
  { name: 'Liechtenstein ' },
  { name: 'Lithuania ' },
  { name: 'Luxembourg ' },
  { name: 'Macau ' },
  { name: 'Macedonia ' },
  { name: 'Madagascar ' },
  { name: 'Malawi ' },
  { name: 'Malaysia ' },
  { name: 'Maldives ' },
  { name: 'Mali ' },
  { name: 'Malta ' },
  { name: 'Marshall Islands ' },
  { name: 'Martinique ' },
  { name: 'Mauritania ' },
  { name: 'Mauritius ' },
  { name: 'Mayotte ' },
  { name: 'Mexico ' },
  { name: 'Micronesia, Fed. St. ' },
  { name: 'Moldova ' },
  { name: 'Monaco ' },
  { name: 'Mongolia ' },
  { name: 'Montserrat ' },
  { name: 'Morocco ' },
  { name: 'Mozambique ' },
  { name: 'Namibia ' },
  { name: 'Nauru ' },
  { name: 'Nepal ' },
  { name: 'Netherlands ' },
  { name: 'Netherlands Antilles ' },
  { name: 'New Caledonia ' },
  { name: 'New Zealand ' },
  { name: 'Nicaragua ' },
  { name: 'Niger ' },
  { name: 'Nigeria ' },
  { name: 'N. Mariana Islands ' },
  { name: 'Norway ' },
  { name: 'Oman ' },
  { name: 'Pakistan ' },
  { name: 'Palau ' },
  { name: 'Panama ' },
  { name: 'Papua New Guinea ' },
  { name: 'Paraguay ' },
  { name: 'Peru ' },
  { name: 'Philippines ' },
  { name: 'Poland ' },
  { name: 'Portugal ' },
  { name: 'Puerto Rico ' },
  { name: 'Qatar ' },
  { name: 'Reunion ' },
  { name: 'Romania ' },
  { name: 'Russia ' },
  { name: 'Rwanda ' },
  { name: 'Saint Helena ' },
  { name: 'Saint Kitts & Nevis ' },
  { name: 'Saint Lucia ' },
  { name: 'St Pierre & Miquelon ' },
  { name: 'Saint Vincent and the Grenadines ' },
  { name: 'Samoa ' },
  { name: 'San Marino ' },
  { name: 'Sao Tome & Principe ' },
  { name: 'Saudi Arabia ' },
  { name: 'Senegal ' },
  { name: 'Serbia ' },
  { name: 'Seychelles ' },
  { name: 'Sierra Leone ' },
  { name: 'Singapore ' },
  { name: 'Slovakia ' },
  { name: 'Slovenia ' },
  { name: 'Solomon Islands ' },
  { name: 'Somalia ' },
  { name: 'South Africa ' },
  { name: 'Spain ' },
  { name: 'Sri Lanka ' },
  { name: 'Sudan ' },
  { name: 'Suriname ' },
  { name: 'Swaziland ' },
  { name: 'Sweden ' },
  { name: 'Switzerland ' },
  { name: 'Syria ' },
  { name: 'Taiwan ' },
  { name: 'Tajikistan ' },
  { name: 'Tanzania ' },
  { name: 'Thailand ' },
  { name: 'Togo ' },
  { name: 'Tonga ' },
  { name: 'Trinidad & Tobago ' },
  { name: 'Tunisia ' },
  { name: 'Turkey ' },
  { name: 'Turkmenistan ' },
  { name: 'Turks & Caicos Is ' },
  { name: 'Tuvalu ' },
  { name: 'Uganda ' },
  { name: 'Ukraine ' },
  { name: 'United Arab Emirates ' },
  { name: 'United Kingdom ' },
  { name: 'Uruguay ' },
  { name: 'Uzbekistan ' },
  { name: 'Vanuatu ' },
  { name: 'Venezuela ' },
  { name: 'Vietnam ' },
  { name: 'Virgin Islands ' },
  { name: 'Wallis and Futuna ' },
  { name: 'West Bank ' },
  { name: 'Western Sahara ' },
  { name: 'Yemen ' },
  { name: 'Zambia ' },
  { name: 'Zimbabwe ' },
  { name: 'Zimbabwe ' },
  { name: 'Aaronsburg' },
  { name: 'AARP' },
  { name: 'ABAC' },
  { name: 'Abbeville, SC' },
  { name: 'Abbeville, GA' },
  { name: 'Abbeville, AL' },
  { name: 'Abbeville, MS' },
  { name: 'Abbeville, LA' },
  { name: 'Abbot' },
  { name: 'Abbotsford' },
  { name: 'Abbott' },
  { name: 'Abbottstown' },
  { name: 'Abbyville' },
  { name: 'Abell' },
  { name: 'Abercrombie' },
  { name: 'Aberdeen, MD' },
  { name: 'Aberdeen, NC' },
  { name: 'Aberdeen, MS' },
  { name: 'Aberdeen, KY' },
  { name: 'Aberdeen, OH' },
  { name: 'Aberdeen, SD' },
  { name: 'Aberdeen, ID' },
  { name: 'Aberdeen, WA' },
  { name: 'Aberdeen Proving Ground' },
  { name: 'Abernant' },
  { name: 'Abernathy' },
  { name: 'Abie' },
  { name: 'Abilene, KS' },
  { name: 'Abilene, TX' },
  { name: 'Abingdon, MD' },
  { name: 'Abingdon, VA' },
  { name: 'Abingdon, IL' },
  { name: 'Abington, MA' },
  { name: 'Abington, CT' },
  { name: 'Abington, PA' },
  { name: 'Abiquiu' },
  { name: 'Abita Springs' },
  { name: 'ABMPS, NY' },
  { name: 'ABMPS, MN' },
  { name: 'Abrams' },
  { name: 'Absaraka' },
  { name: 'Absarokee' },
  { name: 'Absecon' },
  { name: 'Acampo' },
  { name: 'Accident' },
  { name: 'Accokeek' },
  { name: 'Agra' },
  { name: 'Ahmedabad' },
  { name: 'Bangalore' },
  { name: 'Bhopal' },
  { name: 'Chennai' },
  { name: 'Coimbatore' },
  { name: 'Delhi' },
  { name: 'Ghaziabad' },
  { name: 'Hyderabad' },
  { name: 'Indore' },
  { name: 'Jaipur' },
  { name: 'Kanpur' },
  { name: 'Kolkata' },
  { name: 'Lucknow' },
  { name: 'Ludhiana' },
  { name: 'Madurai' },
  { name: 'Mumbai' },
  { name: 'Nagpur' },
  { name: 'Patna' },
  { name: 'Pimpri-Chinchwad' },
  { name: 'Pune' },
  { name: 'Surat' },
  { name: 'Thane' },
  { name: 'Vadodara' },
  { name: 'Visakhapatnam' },
  { name: 'Nashik' },
  { name: 'Faridabad' },
  { name: 'Meerut' },
  { name: 'Rajkot' },
  { name: 'Kalyan-Dombivali' },
  { name: 'Vasai-Virar' },
  { name: 'Varanasi' },
  { name: 'Srinagar' },
  { name: 'Aurangabad' },
  { name: 'Dhanbad' },
  { name: 'Amritsar' },
  { name: 'Navi Mumbai' },
  { name: 'Allahabad' },
  { name: 'Ranchi' },
  { name: 'Howrah' },
  { name: 'Jabalpur' },
  { name: 'Gwalior' },
  { name: 'Vijayawada' },
  { name: 'Jodhpur' },
  { name: 'Raipur' },
  { name: 'Kota' },
  { name: 'Guwahati' },
  { name: 'Chandigarh' },
  { name: 'Thiruvananthapuram' },
  { name: 'Solapur' },
  { name: 'Hubballi-Dharwad' },
  { name: 'Tiruchirappalli' },
  { name: 'Bareilly' },
  { name: 'Moradabad' },
  { name: 'Mysore' },
  { name: 'Tiruppur' },
  { name: 'Gurgaon' },
  { name: 'Aligarh' },
  { name: 'Jalandhar' },
  { name: 'Bhubaneswar' },
  { name: 'Salem' },
  { name: 'Mira-Bhayandar' },
  { name: 'Warangal' },
  { name: 'Guntur' },
  { name: 'Bhiwandi' },
  { name: 'Saharanpur' },
  { name: 'Gorakhpur' },
  { name: 'Bikaner' },
  { name: 'Amravati' },
  { name: 'Noida' },
  { name: 'Afghanistan' },
  { name: 'Albania' },
  { name: 'Algeria' },
  { name: 'Andorra' },
  { name: 'Angola' },
  { name: 'Antigua & Deps' },
  { name: 'Argentina' },
  { name: 'Armenia' },
  { name: 'Australia' },
  { name: 'Austria' },
  { name: 'Azerbaijan' },
  { name: 'Bahamas' },
  { name: 'Bahrain' },
  { name: 'Bangladesh' },
  { name: 'Barbados' },
  { name: 'Belarus' },
  { name: 'Belgium' },
  { name: 'Belize' },
  { name: 'Benin' },
  { name: 'Bhutan' },
  { name: 'Bolivia' },
  { name: 'Bosnia Herzegovina' },
  { name: 'Botswana' },
  { name: 'Brazil' },
  { name: 'Brunei' },
  { name: 'Bulgaria' },
  { name: 'Burkina' },
  { name: 'Burundi' },
  { name: 'Cambodia' },
  { name: 'Cameroon' },
  { name: 'Canada' },
  { name: 'Cape Verde' },
  { name: 'Central African Rep' },
  { name: 'Chad' },
  { name: 'Chile' },
  { name: 'China' },
  { name: 'Colombia' },
  { name: 'Comoros' },
  { name: 'Congo' },
  { name: 'Congo {Democratic Rep}' },
  { name: 'Costa Rica' },
  { name: 'Croatia' },
  { name: 'Cuba' },
  { name: 'Cyprus' },
  { name: 'Czech Republic' },
  { name: 'Denmark' },
  { name: 'Djibouti' },
  { name: 'Dominica' },
  { name: 'Dominican Republic' },
  { name: 'East Timor' },
  { name: 'Ecuador' },
  { name: 'Egypt' },
  { name: 'El Salvador' },
  { name: 'Equatorial Guinea' },
  { name: 'Eritrea' },
  { name: 'Estonia' },
  { name: 'Ethiopia' },
  { name: 'Fiji' },
  { name: 'Finland' },
  { name: 'France' },
  { name: 'Gabon' },
  { name: 'Gambia' },
  { name: 'Georgia' },
  { name: 'Germany' },
  { name: 'Ghana' },
  { name: 'Greece' },
  { name: 'Grenada' },
  { name: 'Guatemala' },
  { name: 'Guinea' },
  { name: 'Guinea-Bissau' },
];

module.exports = {
  LocationMaster: _.uniqBy(LocationMaster, 'name')
};
