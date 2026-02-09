# **FOR INTRO:**



**I would describe my biggest strengths as self-control, self-awareness, adaptability, prioritization, and organization. Earlier in my academic journey, organization and self-awareness were areas I had to work hard on, but through deliberate effort they’ve become strengths that help me manage projects, communicate effectively, and stay focused under pressure.**



**I’m naturally curious and systems-oriented. I enjoy understanding how different components connect, identifying bottlenecks or limitations, and finding practical ways to improve efficiency. Solving new problems and learning how things work is what motivates me most.**



**My academic background combines programming and analytics. I earned an associate degree in computer programming and a bachelor’s degree in Information Science and Data Analytics, graduating cum laude. Through that experience I developed skills in software development, data engineering concepts, cybersecurity fundamentals, networking, technical writing, stakeholder communication, and data visualization. I also studied information architecture, UX/UI, and information systems, which strengthened my understanding of how technology supports real users and organizations.**



**I’m particularly interested in responsible technology — data privacy, security practices, business continuity planning, and governance. I try to approach systems not just from a technical standpoint but also from risk, compliance, and long-term sustainability perspectives.**



**My path to this field wasn’t traditional. I completed fire academy training, earned my EMT certification, and volunteered in fire service, including wildfire strike teams. Later, I stepped away to care for my grandparents while continuing school, which taught me patience, responsibility, and resilience. After relocating to Missouri, I completed my bachelor’s and began building a GitHub portfolio to demonstrate my work and continue growing as a developer.**



**Change has been a constant throughout my life, so I’m comfortable adapting, learning new tools quickly, and operating in unfamiliar environments. I’m ambitious and plan to continue my education with a master’s degree in a technical or analytical field.**



**Personally, I value integrity, family, and continuous growth. I enjoy reading, staying active, spending time outdoors, and I’m a licensed skydiver. Experiences like that have reinforced my ability to stay calm, think clearly, and make decisions in high-pressure situations.**



**Basically, I see myself as someone who asks good questions, works hard to understand systems deeply, and is motivated to contribute wherever I can make processes, tools, or teams function better.**

# 

# 

# **FOR DEMO**





#### STUDENT TOKEN:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZmYxNDljZC04NmQ3LTQ4ZjctYmIyMC02OWM5MmQxZWIyOWUiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc3MDY0NTc5OCwiZXhwIjoxNzcwNzMyMTk4fQ.sQVU-hhDcoBHkMAy81lv-vOhKjjV-\_WW-VGWZsKzwuc



#### STUDENT ID: cff149cd-86d7-48f7-bb20-69c92d1eb29e



#### ADMIN TOKEN:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0M2RmMjZlNi1mNGNjLTExZjAtOWEwMi1hODVlNDU4NzRkOWQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzA2NDU4MzQsImV4cCI6MTc3MDczMjIzNH0.HEZ4qnTlRGiAQeQ7YiWjO-VjhgV791oeUNW24sfKZk4







##### **1.) CREATE STUDENT USER:**



POST /api/auth/register



{

&nbsp; "email": "john.appleseed@datau.edu",

&nbsp; "password": "password123!",

&nbsp; "firstName": "John",

&nbsp; "lastName": "Appleseed"

}





##### **2.) LOGIN AS STUDENT:**



POST /api/auth/login



{

&nbsp; "email": "john.appleseed@datau.edu",

&nbsp; "password": "password123!"

}





##### **3.) LOGIN AS ADMIN:**



POST /api/auth/login



{

&nbsp; "email": "admin@continuityops.local",

&nbsp; "password": "password123"

}





##### **4.) TEST PROTECTED ADMIN ROUTE:**



GET /api/admin/users



Authorization Bearer STUDENT\_TOKEN\_HERE





###### **THEN**



GET /api/admin/users



Authorization Bearer ADMIN\_TOKEN\_HERE





##### **5.) TEST SUSPEND ACCOUNT LOGIC:**



PATCH /api/users/{studentId}/suspend



Authorization Bearer ADMIN\_TOKEN\_HERE





##### **6.) TRY ACCESSING PROTECTED ROUTE W/ SUSPENDED ACCOUNT:**



GET /api/users/me



Header: Authorization: Bearer STUDENT\_TOKEN\_HERE



##### **7.) VIEW AUDIT LOGS (ADMIN ONLY):**



GET /api/admin/audit-logs



Authorization Bearer ADMIN\_TOKEN\_HERE













