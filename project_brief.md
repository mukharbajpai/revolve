# Revolve — Project Brief

## 1. Project Overview

**Project Name:** Revolve  
**Course:** Entrepreneurship & Startups  
**Concept:** Integrated Fitness & Rehabilitation Service

Revolve is an integrated fitness and rehabilitation service combining:
- Musculoskeletal physiotherapy
- Rehabilitation
- Functional training
- Personal training
- Group training
- Corporate wellness
- Assessments and workshops

The core customer journey is:

**Physiotherapy → Rehabilitation → Functional Training → Performance**

Revolve solves the gap where customers complete physiotherapy but then have to independently figure out how to safely return to strength training, fitness, or sport.

Revolve should not be positioned as **“a gym with a physio.”** It should be positioned as an **integrated recovery-to-performance system**.

## 2. Problem Statement

Fitness and physiotherapy are usually offered separately. A customer recovering from an injury may complete physiotherapy successfully but then transition independently into a gym or fitness environment.

This creates:
- No structured handover from physiotherapist to trainer
- Repeated explanation of injury history
- Poor visibility of restrictions and rehabilitation progress
- Risk of poor progression or re-injury
- Fragmented customer experience
- No continuous tracking from recovery to performance

Revolve integrates these stages into one coordinated journey.

## 3. Target Customers

Primary segments:
- People recovering from musculoskeletal injuries
- Fitness-focused individuals
- Gym-goers
- Runners and recreational athletes
- Working professionals
- Customers with mobility or movement limitations

Adjacent segments:
- Sports academies
- Corporate wellness programmes
- College athletes
- Elderly mobility programmes
- Post-surgery rehabilitation customers

## 4. Value Proposition

Revolve helps customers move through:

**Injury → Physiotherapy → Rehabilitation → Functional Training → Strength → Performance**

The key differentiator is **continuity and coordination**. The physiotherapist and trainer work from the same customer progression plan rather than operating independently.

Customer value:
- One integrated recovery journey
- Shared progress records
- Safer return to training
- Better continuity between clinical and fitness services
- Easier booking and progress tracking
- Long-term support after rehabilitation

## 5. Revenue Model

Revenue streams:
1. Functional training / gym memberships
2. Personal training
3. Physiotherapy
4. Rehabilitation programmes
5. Group training
6. Corporate wellness
7. Workshops and assessments

Pricing logic:
- Membership / subscription
- Pay-per-session
- Package-based pricing
- Contractual / B2B pricing

Possible loss-leader strategy:
- Free trial fitness session → membership / PT upsell
- Low-cost mobility or physiotherapy assessment → physio / rehab upsell

## 6. Critical Success Factors

- Customer acquisition
- Customer retention
- Qualified physiotherapists and trainers
- Strong physio-to-trainer coordination
- Competitive and flexible pricing
- Cost management
- Good location and accessibility
- Trust and professional credibility
- Facility utilisation
- Consistent service quality

# Digital Product Strategy

## 7. Role of the Mobile and Web Apps

The professor requires both a **mobile app prototype** and a **web app prototype**.

Because Revolve is fundamentally a service business, the digital product should act as the **experience and coordination layer** around the physical service.

The digital journey should follow:

**Discover → Book → Track → Recover → Train → Retain**

The app should not replace the physical service.

# Mobile App

## 8. Mobile App Purpose

The mobile app is customer-facing. It should help customers:
- Discover Revolve services
- Book appointments
- Track recovery and fitness progress
- Understand their current journey stage
- View physiotherapist and trainer recommendations
- Manage memberships and plans
- Stay engaged across the full journey

## 9. Mobile App Screens

### Screen 1 — Splash / Login
- Revolve logo
- Tagline: **Recover. Train. Perform.**
- Login / Continue button

### Screen 2 — Home Dashboard
Example content:
- Greeting
- Current journey stage
- Next session
- Quick booking CTA
- Progress snapshot
- Quick access to services

Sample metrics:
- Pain: 6 → 2
- Mobility: 58 → 81
- Strength: 42 → 68

### Screen 3 — Services
Service cards:
- Physiotherapy
- Rehabilitation
- Functional Training
- Personal Training
- Group Training
- Assessments

Each card can show:
- Service name
- Short description
- Duration
- Pricing type
- View Details

### Screen 4 — Service Detail
Example: Physiotherapy
- What the service includes
- Who it is for
- Session duration
- Professional profile
- Pricing logic
- Book Now

### Screen 5 — Booking
Flow:
1. Select service
2. Select professional
3. Select date
4. Select time
5. Confirm booking

### Screen 6 — My Journey
This is one of the most important screens.

Example:
- Physiotherapy ✅
- Rehabilitation ✅
- Functional Training 🟡
- Performance 🔒

Show:
- Current stage
- Completion percentage
- Completed milestones
- Next milestone
- Upcoming review

### Screen 7 — Progress
Track:
- Pain score
- Mobility score
- Strength score
- Attendance
- Completed sessions
- Milestones achieved

Use progress bars, trends, and simple cards.

### Screen 8 — Integrated Care Plan
This is the **hero feature**.

Example:

**Goal:** Return to Running  
**Current Stage:** Rehabilitation  
**Physio Recommendation:** Improve knee stability and continue controlled loading.  
**Trainer Recommendation:** Begin controlled lower-body strength training.  
**Current Restrictions:** Avoid running for 2 weeks.  
**Next Milestone:** Pain-free 5 km walk.  
**Progress:** 72%

This feature represents the shared coordination between the physiotherapist and trainer.

# Web App

## 10. Web App Purpose

The web app is mainly for:
- Physiotherapists
- Trainers
- Admin / Operations staff

It should function as a lightweight operating system for Revolve.

## 11. Web App Screens

### Screen 1 — Operations Dashboard
Suggested KPIs:
- Active Members
- Today’s Appointments
- Rehab Customers
- Rehab → Fitness Conversion
- Monthly Revenue
- Facility Utilisation

Suggested sections:
- Today’s schedule
- Recent clients
- Journey-stage distribution
- Revenue by service
- Staff utilisation

### Screen 2 — Client List
Columns:
- Customer Name
- Current Stage
- Assigned Professional
- Next Appointment
- Membership Status
- Progress %

Filters:
- Physiotherapy
- Rehabilitation
- Functional Training
- Performance
- Trainer
- Physiotherapist

### Screen 3 — Client Profile
Sections:
- Basic profile
- Customer goal
- Injury / movement history
- Initial assessment
- Current journey stage
- Progress metrics
- Physio notes
- Trainer notes
- Restrictions
- Next milestone
- Upcoming appointments
- Payment / membership status

### Screen 4 — Appointments / Operations
Calendar view showing:
- Physiotherapy sessions
- Rehabilitation sessions
- Functional training
- Personal training
- Assessments

Admin should be able to see:
- Professional availability
- Booking status
- Session type
- Customer name
- Time slot

## 12. Core Operational Feature

The strongest operational feature is the **handover between physiotherapist and trainer**.

Example physiotherapist update:
- Pain: 2/10
- Mobility improved
- Squats allowed
- Avoid running for 2 weeks

The trainer should be able to see this before the customer transitions into functional training.

This shared progression record is central to Revolve’s USP.

## 13. Prototype Scope

This is only a prototype.

### Build
- Clickable mobile prototype
- Clickable web dashboard prototype
- Realistic sample content
- Clear navigation
- Strong customer journey
- Strong integrated-care experience

### Do Not Build
- Real backend
- Real database
- Real authentication
- Real payment integration
- Real notifications
- Production infrastructure
- AI features unless used only for visual demonstration

## 14. Recommended Tool

**Figma**

Use Figma to create:
- Mobile screens
- Web screens
- Components
- Clickable interactions
- Prototype flows

Optional later step:
- React / Next.js only if a working front-end demo is specifically required

## 15. Visual Direction

The design should feel:
- Clean
- Premium
- Professional
- Health-oriented
- Performance-oriented
- Trustworthy
- Modern but not flashy

Recommended style:
- White / off-white background
- Dark charcoal text
- One muted accent colour
- Minimal cards
- Rounded but professional components
- Large progress indicators
- Clean typography
- Limited visual clutter

Avoid:
- Aggressive bodybuilding aesthetic
- Neon gym colours
- Overuse of gradients
- Generic fitness-app look

## 16. Prototype Navigation Flow

### Customer Flow
**Splash → Home → Services → Service Detail → Booking → My Journey → Progress → Integrated Care Plan**

### Staff Flow
**Dashboard → Client List → Client Profile → Appointments**

## 17. Key Story to Demonstrate

The prototype should tell one clear story:

1. Customer discovers Revolve
2. Customer books a physiotherapy assessment
3. Customer enters rehabilitation
4. Progress is tracked digitally
5. Physiotherapist updates restrictions and recommendations
6. Trainer receives the handover
7. Customer transitions into functional training
8. Customer continues toward performance

This demonstrates that Revolve is not simply co-locating fitness and physiotherapy. It is creating a **coordinated recovery-to-performance journey**.

## 18. Prototype Presentation Line

> **Revolve is fundamentally a service business. The digital platform does not replace the physical service; it connects the customer’s entire journey from discovery and booking to rehabilitation, training, progress tracking and retention, while giving physiotherapists and trainers a shared operating system.**

## 19. Current Project Focus

The immediate goal is to create a **polished, clickable Figma prototype** for both mobile and web.

Priority:
1. Customer journey clarity
2. Integrated Care Plan
3. My Journey progress flow
4. Service discovery and booking
5. Staff client-management dashboard

The prototype should clearly demonstrate **why Revolve needs a digital layer** and how that layer strengthens the core service business.
