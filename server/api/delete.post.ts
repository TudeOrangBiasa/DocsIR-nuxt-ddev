import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const { documentId } = await readBody(event)

    if (!documentId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Document ID is required'
      })
    }

    // Convert to number for Prisma
    const id = parseInt(documentId)
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid document ID'
      })
    }

    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: {
        id: id
      }
    })

    if (!existingDocument) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document not found'
      })
    }

    // Delete the document
    await prisma.document.delete({
      where: {
        id: id
      }
    })

    return {
      success: true,
      message: 'Document deleted successfully',
      deletedDocument: {
        id: existingDocument.id,
        filename: existingDocument.filename
      }
    }

  } catch (error) {
    console.error('Delete document error:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete document'
    })
  }
})
