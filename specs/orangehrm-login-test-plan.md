# OrangeHRM Login and Post-Login Test Plan

## Application Overview

Exercise the OrangeHRM Open Source demo at https://opensource-demo.orangehrmlive.com. Authentication uses Admin / admin123. Every test must start in a fresh browser context, authenticate independently, and avoid leaving changes in the shared demo tenant. Post-login coverage spans dashboard, Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Directory, Maintenance, Claim, Buzz, and logout. If a feature is unavailable because of demo data, permissions, or entitlement, record the actual state rather than treating an unavailable action as a pass.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid demo credentials

**File:** `tests/orangehrm/login-valid-credentials.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The OrangeHRM Login page is displayed with Username, Password, and Login controls.
  2. Enter Admin as Username and admin123 as Password.
    - expect: The username is visible and the password is masked.
  3. Click Login.
    - expect: The authenticated dashboard opens at /web/index.php/dashboard/index.
    - expect: No authentication error is displayed.

#### 1.2. Reject invalid password

**File:** `tests/orangehrm/login-invalid-password.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context.
    - expect: The Login page is displayed.
  2. Enter Admin and an incorrect password, then click Login.
    - expect: Authentication is rejected, an invalid-credentials message is shown, and the browser remains on the Login page.

#### 1.3. Require username and password

**File:** `tests/orangehrm/login-empty-fields.spec.ts`

**Steps:**
  1. Open the login URL in a fresh browser context and click Login without entering either value.
    - expect: Required-field feedback is displayed and the dashboard does not open.

### 2. Post-Login Workflows

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify dashboard widgets and module navigation

**File:** `tests/orangehrm/dashboard.spec.ts`

**Steps:**
  1. In a fresh context, log in with Admin / admin123.
    - expect: The Dashboard heading and authenticated user menu are visible.
  2. Review the dashboard widgets, including Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, and employee distribution.
    - expect: Widgets load with data or an explicit empty-state message; the page has no blocking error.
  3. Open the PIM module from the sidebar, then return to Dashboard.
    - expect: The PIM page opens and Dashboard navigation returns to the dashboard.

#### 2.2. Search system users in Admin

**File:** `tests/orangehrm/admin-users-search.spec.ts`

**Steps:**
  1. Log in and open Admin from the sidebar.
    - expect: The System Users page and username, role, employee, and status filters are displayed.
  2. Search for the existing Admin username.
    - expect: The matching system-user record is shown with role, employee, status, and available row actions.
  3. Reset the search filters.
    - expect: The filters clear and the unfiltered user list is restored.

#### 2.3. Validate employee creation form in PIM

**File:** `tests/orangehrm/pim-add-employee-validation.spec.ts`

**Steps:**
  1. Log in, open PIM, and select Add Employee.
    - expect: The Add Employee form displays First Name, Last Name, and Save and Cancel controls.
  2. Leave required fields blank and select Save.
    - expect: Required-field validation is displayed and no employee record is created.
  3. Select Cancel to leave the form.
    - expect: The form closes or returns to the employee view without saving data.

#### 2.4. Search and reset the employee list

**File:** `tests/orangehrm/pim-employee-search.spec.ts`

**Steps:**
  1. Log in, open PIM, and select Employee List.
    - expect: Employee Information filters and the employee results table are displayed.
  2. Search for a known existing employee using the employee name field, then select Search.
    - expect: Matching employee rows are displayed; unrelated rows are excluded.
  3. Select Reset.
    - expect: Search criteria clear and the default employee list is restored.

#### 2.5. Review Leave views and apply-form availability

**File:** `tests/orangehrm/leave-workflows.spec.ts`

**Steps:**
  1. Log in and open Leave.
    - expect: Leave navigation includes Apply, My Leave, Leave List, and Assign Leave.
  2. Open Leave List, review its employee/date/status filters, and run a search with the default criteria.
    - expect: The leave list loads, or an explicit no-records state is displayed.
  3. Open Apply and inspect leave type, date, and balance availability without submitting a request.
    - expect: The Apply Leave view loads. If leave types or balances are unavailable, the page communicates the limitation and no request is created.

#### 2.6. Review employee timesheets

**File:** `tests/orangehrm/time-timesheets.spec.ts`

**Steps:**
  1. Log in and open Time.
    - expect: The Timesheets view and employee selection control are displayed.
  2. Review the timesheets pending action list and select View on an available row, if present.
    - expect: The selected timesheet details open; when no rows are available, an empty state is shown.
  3. Return to the timesheet list without approving, rejecting, or editing any entry.
    - expect: The timesheet list is accessible and no data has been changed.

#### 2.7. Search candidates in Recruitment

**File:** `tests/orangehrm/recruitment-candidates.spec.ts`

**Steps:**
  1. Log in, open Recruitment, and select Candidates.
    - expect: Candidate filters, Search, Reset, and Add controls are displayed.
  2. Run a search using default criteria, then reset the filters.
    - expect: Candidate results or an explicit empty state are displayed; Reset clears search criteria.
  3. Select Add and attempt to save the candidate form with required fields blank.
    - expect: Required-field validation is displayed and no candidate is created.
  4. Cancel the candidate form.
    - expect: The candidate list returns without saving a record.

#### 2.8. Review personal information sections

**File:** `tests/orangehrm/my-info-sections.spec.ts`

**Steps:**
  1. Log in and open My Info.
    - expect: The authenticated employee's Personal Details view is displayed.
  2. Open Contact Details, Emergency Contacts, Dependents, Job, and Qualifications sections where available.
    - expect: Each selected section loads its fields or a clear empty state.
  3. Do not edit or save profile values.
    - expect: Existing personal data remains unchanged.

#### 2.9. Search Performance reviews

**File:** `tests/orangehrm/performance-reviews.spec.ts`

**Steps:**
  1. Log in and open Performance.
    - expect: Manage Reviews and Employee Reviews are displayed.
  2. Review the employee and date filters and run Search with default criteria.
    - expect: Matching review rows or a clear no-results state are displayed.
  3. Reset the filters if available.
    - expect: Filter values clear and the review list returns to its default state.

#### 2.10. Search the employee Directory

**File:** `tests/orangehrm/directory-search.spec.ts`

**Steps:**
  1. Log in and open Directory.
    - expect: Directory filters for employee name and job title are displayed.
  2. Search using a known employee name and inspect the result.
    - expect: Matching directory entry is displayed, or a clear no-results state appears.
  3. Select Reset.
    - expect: Search values clear and the default directory view returns.

#### 2.11. Verify Maintenance administrator revalidation

**File:** `tests/orangehrm/maintenance-access-gate.spec.ts`

**Steps:**
  1. Log in and open Maintenance.
    - expect: An Administrator Access prompt requests credential validation before the critical function is available.
  2. Select Cancel without entering the administrator password.
    - expect: The protected maintenance operation is not opened and no data is purged.

#### 2.12. Review Claim pages without submitting a claim

**File:** `tests/orangehrm/claim-workflows.spec.ts`

**Steps:**
  1. Log in and open Claim.
    - expect: Claim navigation includes Submit Claim, My Claims, Employee Claims, and Assign Claim.
  2. Open Employee Claims and run a search using the default criteria.
    - expect: Claim rows or a clear empty state are displayed with available View Details actions.
  3. Open an available claim's details, then return without assigning, approving, or submitting a claim.
    - expect: Claim details are viewable and no claim status or record is changed.

#### 2.13. Review Buzz feed and composer validation

**File:** `tests/orangehrm/buzz-workflows.spec.ts`

**Steps:**
  1. Log in and open Buzz.
    - expect: The Buzz feed, post composer, and feed sort controls are displayed.
  2. Switch between Most Recent Posts, Most Liked Posts, and Most Commented Posts.
    - expect: The feed updates for each selected sort mode.
  3. Leave the post composer empty and inspect the Post action without submitting content.
    - expect: No empty post is created; the Post action is disabled or validation prevents submission.

#### 2.14. Log out and verify protected-page behavior

**File:** `tests/orangehrm/logout.spec.ts`

**Steps:**
  1. Log in, open the authenticated user menu, and select Logout.
    - expect: The browser returns to the OrangeHRM Login page and the authenticated session ends.
  2. Use browser navigation to revisit the dashboard URL.
    - expect: The protected dashboard is not available without authentication; the user is redirected to Login or prompted to authenticate.
