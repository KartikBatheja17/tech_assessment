# Architecture Notes

## Database Design

The system uses two main tables:

### Lead

Stores lead-related information:

* Name
* Email
* Company
* Status
* Notes

### AuditLog

Stores all changes made to leads:

* Action type (CREATE, UPDATE, DELETE, RESTORE)
* Previous data snapshot
* New data snapshot
* Timestamp
* Foreign key relation to Lead

---

# Relationships

* One Lead can have many AuditLog entries
* AuditLog uses a ForeignKey relationship with Lead

Relationship:
Lead → AuditLog (One-to-Many)

---

# Indexing Strategy

The following fields are important for indexing:

* Lead ID
* AuditLog timestamp
* Foreign key relation between Lead and AuditLog

Primary keys are automatically indexed by PostgreSQL.

Ordering audit logs by timestamp improves history tracking.

---

# Audit Strategy

A custom audit/version tracking mechanism was implemented without using third-party packages.

Whenever a lead is:

* Created
* Updated
* Deleted
* Restored

an AuditLog entry is automatically generated.

The system stores:

* old_data
* new_data
* action type
* timestamp

This enables complete version tracking and rollback functionality.

---

# Alternative Approaches Considered

Alternative approaches considered:

* Soft delete mechanism
* Event sourcing
* Third-party history/versioning packages

These approaches were avoided because the assignment explicitly restricted third-party audit/versioning packages.

A custom audit tracking system provided more control and transparency.

---

# Scalability Considerations

For larger systems:

* Pagination can be added for audit logs
* Database indexing can be expanded
* Archiving older audit records can improve performance
* Separate audit services or queues can be introduced
* Redis caching can improve read performance

The current architecture is modular and can scale further with optimization.
