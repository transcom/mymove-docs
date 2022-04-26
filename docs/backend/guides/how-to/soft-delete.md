---
sidebar_position: 9
---

# How to Soft Delete

Due to our contractual obligations with the federal government, we must be able to access deleted data even several years after it’s been used in the system. For this reason, MilMove is shifting away from hard deleting data and adopting the practice to soft delete instead. Soft delete functionality has not yet been implemented throughout the entire codebase but it is expected to be the sole deletion method moving forward.

Please note that soft delete is to be treated like a hard delete in the regard that the process should never be reversed or that data can be 'un-deleted'.

## How Soft Delete Works

MilMove's implementation of soft delete takes in a model, sets a time stamp to its `DeletedAt` field, before cascading down to its children and repeating the process until there are no longer children to 'delete'.

## Prerequisites for Soft Delete

To use soft delete, a model and its children (or foreign key associations) must possess a `DeletedAt` field that corresponds to the `deleted_at` column of their table within the database.

```go
type ExampleModel struct {
    ...
    DeletedAt   *time.Time  `db:"deleted_at"`

}
```

If this has not been done, one must [create a migration](migrate-the-database.md) to make these changes.

## Querying for non-deleted records

Records that have been soft deleted will still exist in the database, so we must filter them out in our database queries if we want to omit deleted data.

The Pop ORM has a chain-able method called [Scope](https://gobuffalo.io/documentation/database/scoping/) that we can use to append the where clause(s) to only include non-deleted records.

```go
func FindShipment(ctx context.Context, shipmentID uuid.UUID) {
    var shipments models.MTOShipments
    ctx.DB().Scope(utilities.ExcludeDeletedScope()).All(&shipments)
}
```

Sometimes you will need to qualify the deleted_at column with the model(s) that you care about to avoid an ambiguous column SQL error. You can achieve this by passing in the models themselves to the ExcludeDeletedScope method. ExcludeDeletedScope will look up the proper table name of the model, using either reflection or the TableName() override specified in the model file.

```go
func FindDocumentsWithUploads(ctx context.Context, uploaderID uuid.UUID) {
    var documents models.Documents
    ctx.DB().Scope(utilities.ExcludeDeletedScope(models.Document{}, models.UserUpload{})).
        Join("user_uploads", "user_uploads.document_id = documents.id").
        All(&documents)
}
```

:::caution

Unfortunately this will not filter any eager loaded associations so you may need to continue doing that depending on your query.

```go
// This will not filter the eagerly loaded MTOShipments
func FindMoveWithShipments(ctx context.Context, moveID uuid.UUID) {
    var move models.Move
    ctx.DB().Scope(utilities.ExcludeDeletedScope(models.MTOShipment{})).Eager(MTOShipments).Find(&move, moveID)
}
```

You should fall back to using a normal where clause if using an alias in your query or writing a RawQuery.

```go
// If a table is given an alias name then the scope may fail to work as intended
func FindAllServiceMembersWithDocuments(ctx context.Context) {
    var serviceMembers []models.ServiceMember
    ctx.DB().Scope(utilities.ExcludeDeletedScope(models.Document{}, models.UserUpload{}).
        Join("documents docs", "documents.service_member_id = service_members.id").
        Join("user_uploads uu", "uu.document_id = docs.id").
        All(&serviceMembers);
}
```

:::

For further details you can find the [ExcludeDeletedScope](https://github.com/transcom/mymove/blob/0002defdbdeebf29c3afdaa1fd939dc457071a3d/pkg/db/utilities/utilities.go#L150) code in the pkg/db/utilities/utilities.go file.

## Using Soft Delete

In order to use MilMove's soft delete method, one must import the following package

```go
package models

import (
    "github.com/transcom/mymove/pkg/db/utilities"
)
```

It is recommended that any use of soft delete be wrapped in a transaction. This is to rollback the deletion should any error arise.

```go
func DeleteExampleModel(db *pop.Connection, exampleModel *ExampleModel) error {
    return db.Transaction(func(db *pop.Connection) error {
        return utilities.SoftDestroy(db, exampleModel)
    })
}
```
