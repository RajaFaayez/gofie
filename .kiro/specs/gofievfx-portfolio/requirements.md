# Requirements Document

## Introduction

A one-page, fully responsive portfolio website for GofieVFX, a professional video editor and motion graphics artist with nearly 6 years of experience. The website serves as a showcase for skills and results while generating quote requests from content creators, YouTubers, brands, and agencies.

## Glossary

- **Portfolio_Website**: The single-page scrolling website showcasing GofieVFX's work and services
- **Hero_Section**: The full-screen opening section with primary branding and call-to-action
- **Contact_Form**: The quote request form for potential clients
- **Portfolio_Slider**: The horizontal image carousel displaying work samples
- **Responsive_Design**: Website layout that adapts to desktop, tablet, and mobile screen sizes

## Requirements

### Requirement 1: Single-Page Architecture

**User Story:** As a potential client, I want to access all information on one scrolling page, so that I can quickly browse the portfolio without navigation delays.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL consist of exactly one HTML page with no sub-pages
2. THE Portfolio_Website SHALL use smooth scrolling navigation between sections
3. WHEN a user clicks navigation elements, THE Portfolio_Website SHALL scroll to the target section on the same page
4. THE Portfolio_Website SHALL load all content on initial page load

### Requirement 2: Responsive Design

**User Story:** As a user on any device, I want the website to display properly, so that I can view the portfolio regardless of my screen size.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display correctly on desktop screens (1200px+ width)
2. THE Portfolio_Website SHALL display correctly on tablet screens (768px-1199px width)
3. THE Portfolio_Website SHALL display correctly on mobile screens (below 768px width)
4. WHEN screen size changes, THE Portfolio_Website SHALL adapt layout without horizontal scrolling
5. THE Portfolio_Website SHALL maintain readability and usability across all device sizes

### Requirement 3: Hero Section Display

**User Story:** As a visitor, I want to immediately understand who GofieVFX is and what they offer, so that I can quickly assess if their services match my needs.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy full screen height on initial load
2. THE Hero_Section SHALL display "GofieVFX" as the primary heading
3. THE Hero_Section SHALL display "Professional Video Editor • Motion Graphics • High-Retention Edits" as subheading
4. THE Hero_Section SHALL display "Nearly 6 years of experience crafting engaging, story-driven videos" as tagline
5. THE Hero_Section SHALL include a "Get a Quote" primary button that scrolls to the contact form
6. THE Hero_Section SHALL include a "View Work" secondary button that scrolls to the portfolio slider
7. THE Hero_Section SHALL use a dark cinematic background with gradient or subtle animated texture

### Requirement 4: About Me Section Content

**User Story:** As a potential client, I want to learn about GofieVFX's experience and approach, so that I can evaluate their expertise for my project.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the exact About Me text: "I'm a professional video editor with nearly six years of hands-on experience, editing since 2020. I specialize in creating engaging, high-retention videos that tell clear stories and keep audiences watching. Over the years, I've worked on a wide range of content including YouTube videos, short-form content, commercials, and social media edits. My editing style focuses on clean pacing, strong storytelling, and modern visual polish. I understand how to edit not just for aesthetics, but for viewer attention, watch time, and platform performance."
2. WHEN viewed on desktop, THE About Me section SHALL use a two-column layout
3. WHEN viewed on mobile, THE About Me section SHALL use a single-column layout
4. THE About Me section SHALL include smooth fade-in animation on scroll

### Requirement 5: Tools and Software Display

**User Story:** As a client, I want to see what software GofieVFX uses, so that I can ensure compatibility with my project requirements.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display "Tools & Software" as section title
2. THE Portfolio_Website SHALL list "Adobe After Effects 2025 (Primary – motion graphics & animation)"
3. THE Portfolio_Website SHALL list "Adobe Premiere Pro (Long-form & YouTube editing)"
4. THE Portfolio_Website SHALL list "DaVinci Resolve (Color grading & cinematic workflows)"
5. THE Portfolio_Website SHALL list "CapCut (Short-form, fast turnaround content)"
6. THE tools section SHALL use icon or card layout with hover effects
7. THE tools section SHALL display in a clean grid format

### Requirement 6: Services Display

**User Story:** As a potential client, I want to understand what services GofieVFX offers, so that I can determine if they can handle my specific project needs.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display "What I Do" as section title
2. THE Portfolio_Website SHALL list "YouTube long-form video editing"
3. THE Portfolio_Website SHALL list "Short-form content (TikTok, Reels, Shorts)"
4. THE Portfolio_Website SHALL list "Motion graphics & animated elements"
5. THE Portfolio_Website SHALL list "Cinematic cuts and storytelling edits"
6. THE Portfolio_Website SHALL list "Color correction & grading"
7. THE Portfolio_Website SHALL list "Sound design & basic audio cleanup"
8. THE Portfolio_Website SHALL list "Fast-paced, retention-focused edits"
9. THE Portfolio_Website SHALL display note text: "Every project is edited with attention to pacing, emotion, and clarity — not just cutting clips together."

### Requirement 7: Plugins and Effects Display

**User Story:** As a technical client, I want to see what advanced tools GofieVFX uses, so that I can understand the quality and capabilities of their work.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display "Plugins & Effects Toolkit" as section title
2. THE Portfolio_Website SHALL list "Sapphire Plugins"
3. THE Portfolio_Website SHALL list "Boris Continuum Complete (BCC)"
4. THE Portfolio_Website SHALL list "Magic Bullet Suite"
5. THE Portfolio_Website SHALL list "Twitch"
6. THE Portfolio_Website SHALL list "Twixtor"
7. THE Portfolio_Website SHALL list "ReelSmart Motion Blur (RSMB)"
8. THE Portfolio_Website SHALL highlight "These plugins are used intentionally — only when they enhance storytelling and visual clarity."

### Requirement 8: Experience and Work Ethic Display

**User Story:** As a client, I want to understand GofieVFX's professional approach, so that I can assess their reliability for my project.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the exact text: "With almost six years of continuous editing experience, I understand deadlines, revisions, and professional communication. I'm comfortable working with project management tools, handling feedback efficiently, and delivering consistent results on a schedule. I treat every project as a long-term collaboration, not just a one-off edit."

### Requirement 9: Value Proposition Display

**User Story:** As a potential client, I want to quickly understand why I should choose GofieVFX, so that I can make an informed decision.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display "Why Work With Me" as section title
2. THE Portfolio_Website SHALL list "Nearly 6 years of real editing experience" with icon
3. THE Portfolio_Website SHALL list "Strong storytelling & pacing sense" with icon
4. THE Portfolio_Website SHALL list "Motion graphics and VFX capability" with icon
5. THE Portfolio_Website SHALL list "Reliable communication & quick responses" with icon
6. THE Portfolio_Website SHALL list "Quality-focused, deadline-driven workflow" with icon

### Requirement 10: Results and Social Proof Display

**User Story:** As a potential client, I want to see proven results, so that I can trust GofieVFX's ability to deliver successful projects.

#### Acceptance Criteria

1. THE Results section SHALL be positioned in the middle of the page
2. THE Portfolio_Website SHALL display the exact statement: "My edits have contributed to 80+ million total views in a single year across client projects on YouTube. These results come from a strong focus on pacing, storytelling, retention, and platform-specific editing strategies."
3. THE Results section SHALL use large typography
4. THE Results section SHALL be center-aligned
5. THE Results section SHALL include subtle glow or accent animation

### Requirement 11: Portfolio Slider Functionality

**User Story:** As a potential client, I want to view work samples easily, so that I can evaluate the quality and style of GofieVFX's editing.

#### Acceptance Criteria

1. THE Portfolio_Slider SHALL be placed directly below the Results section
2. THE Portfolio_Slider SHALL display as a horizontal image carousel
3. THE Portfolio_Slider SHALL show screenshot images with approximately 267 × 491 aspect ratio
4. WHEN viewed on mobile, THE Portfolio_Slider SHALL enable swipe navigation
5. WHEN viewed on desktop, THE Portfolio_Slider SHALL provide arrow navigation
6. THE Portfolio_Slider SHALL use smooth transitions between images
7. THE Portfolio_Slider SHALL have a dark container background

### Requirement 12: Contact Form Functionality

**User Story:** As a potential client, I want to easily request a quote, so that I can start a conversation about my project needs.

#### Acceptance Criteria

1. THE Contact_Form SHALL display "Get a Quote" as title
2. THE Contact_Form SHALL include a "Name" input field
3. THE Contact_Form SHALL include an "Email" input field
4. THE Contact_Form SHALL include a "Project Type" dropdown field
5. THE Contact_Form SHALL include a "Message / Project Details" textarea field
6. THE Contact_Form SHALL include a submit button
7. THE Contact_Form SHALL use modern UI with floating labels or minimal borders
8. THE Contact_Form SHALL display a success confirmation message after submission
9. THE Contact_Form SHALL have a clear call-to-action design

### Requirement 13: Contact Details Display

**User Story:** As a potential client, I want to see multiple ways to contact GofieVFX, so that I can choose my preferred communication method.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display a clickable email link "📩 Email: Gofievfx@gmail.com" that opens the user's email application
2. THE Portfolio_Website SHALL display "💬 Discord: gofie_vfx"
3. THE contact details SHALL be clearly visible and formatted
4. WHEN a user clicks the email contact item, THE system SHALL open the default email application with the recipient pre-filled

### Requirement 14: Visual Design and User Experience

**User Story:** As a visitor, I want a professional and modern browsing experience, so that I feel confident in GofieVFX's design capabilities.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL use a dark, premium color palette
2. THE Portfolio_Website SHALL use sans-serif modern font (Inter or Poppins style)
3. THE Portfolio_Website SHALL include subtle section animations
4. THE Portfolio_Website SHALL maintain clean spacing throughout
5. THE Portfolio_Website SHALL avoid unnecessary elements
6. THE Portfolio_Website SHALL convey a professional video editor aesthetic

### Requirement 15: Performance and Loading

**User Story:** As a user, I want the website to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL load quickly with minimal clutter
2. THE Portfolio_Website SHALL use modern animations that are subtle and professional
3. THE Portfolio_Website SHALL maintain fast loading times across all devices
4. THE Portfolio_Website SHALL optimize images and assets for web performance