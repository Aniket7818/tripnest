import { format, parseISO, differenceInDays, isValid } from 'date-fns'

/**
 * Format a number into Indian Rupee currency format (e.g., ₹14,500)
 */
export function formatINR(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format a raw date string (YYYY-MM-DD) into readable format (e.g., "12 Nov 2026")
 */
export function formatDate(dateStr: string, formatStr: string = 'dd MMM yyyy'): string {
  try {
    const parsed = parseISO(dateStr)
    if (!isValid(parsed)) return dateStr
    return format(parsed, formatStr)
  } catch {
    return dateStr
  }
}

/**
 * Calculate the number of calendar days between two dates inclusive
 */
export function getDaysCount(startDateStr: string, endDateStr: string): number {
  try {
    const start = parseISO(startDateStr)
    const end = parseISO(endDateStr)
    if (!isValid(start) || !isValid(end)) return 1
    const diff = differenceInDays(end, start)
    return diff >= 0 ? diff + 1 : 1
  } catch {
    return 1
  }
}

/**
 * Generate a unique ID with an optional prefix
 */
export function generateUniqueId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`
}
