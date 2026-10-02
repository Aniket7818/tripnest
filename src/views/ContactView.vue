<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import type { ContactSubmission } from '@/types'
import AccordionItem from '@/components/ui/AccordionItem.vue'
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-vue-next'

const toastStore = useToastStore()

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const isSubmitted = ref(false)
const errors = ref<{ [key: string]: string }>({})

const faqs = [
  {
    question: 'How are estimated budgets calculated in TripNest?',
    answer: 'Budgets are based on realistic average regional travel indices across India for transportation, standard hotel/homestay accommodation, local dining, and entry/activity costs. They serve as reliable planning estimates.'
  },
  {
    question: 'Can I print or save my customized itinerary as a PDF?',
    answer: 'Yes! Navigate to any trip inside "My Trips", click the "Print Itinerary" button on desktop or mobile, and use your browser’s native print dialog to print or save directly as a clean PDF document.'
  },
  {
    question: 'Are my trips and saved destinations saved anywhere else?',
    answer: 'TripNest uses your browser’s LocalStorage to store all created itineraries and favorited destinations locally. There is no external database or server tracking your plans.'
  },
  {
    question: 'Can I add multiple destinations to a single trip itinerary?',
    answer: 'Yes! During Step 1 of the Trip Planner, you can select multiple destinations (for example, Manali + Kasol or Jaipur + Udaipur). The planner will integrate both into your summary.'
  },
  {
    question: 'Is this a live booking engine or flight reservation system?',
    answer: 'TripNest is a frontend portfolio demonstration project built to showcase product design, state management, and UX engineering. No live bookings, flights, or payments are processed.'
  }
]

function handleSubmit() {
  errors.value = {}

  if (!name.value.trim()) {
    errors.value.name = 'Please enter your name'
  }
  if (!email.value.trim() || !email.value.includes('@')) {
    errors.value.email = 'Please provide a valid email address'
  }
  if (!subject.value.trim()) {
    errors.value.subject = 'Please choose or enter a subject'
  }
  if (!message.value.trim() || message.value.length < 10) {
    errors.value.message = 'Please provide a message with at least 10 characters'
  }

  if (Object.keys(errors.value).length > 0) return

  // Save submission to local storage for demo
  const submission: ContactSubmission = {
    id: `sub-${Date.now()}`,
    name: name.value.trim(),
    email: email.value.trim(),
    subject: subject.value.trim(),
    message: message.value.trim(),
    submittedAt: new Date().toISOString()
  }

  try {
    const existing = JSON.parse(localStorage.getItem('tripnest_contact_submissions') || '[]')
    existing.push(submission)
    localStorage.setItem('tripnest_contact_submissions', JSON.stringify(existing))
  } catch (e) {
    console.warn(e)
  }

  isSubmitted.value = true
  toastStore.showToast('Your message has been received! (Demo stored locally)', 'success')
}

function resetForm() {
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
  isSubmitted.value = false
  errors.value = {}
}
</script>

<template>
  <div class="contact-view">
    <!-- Hero -->
    <header class="contact-hero">
      <div class="container hero-inner">
        <span class="text-eyebrow">GET IN TOUCH</span>
        <h1 class="page-title">We’d love to hear from you</h1>
        <p class="page-subtitle">
          Have feedback on the TripNest planner, suggestion for new destinations, or a portfolio inquiry? Send us a note.
        </p>
      </div>
    </header>

    <main class="container contact-main">
      <div class="contact-grid">
        <!-- Left: Form -->
        <div class="form-card card">
          <div v-if="!isSubmitted">
            <h2 class="form-title">Send a Message</h2>
            <p class="form-subtitle">Fill in the fields below. Messages are recorded locally for demonstration.</p>

            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label class="form-label" for="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  v-model="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  :class="['form-input', { 'has-error': errors.name }]"
                />
                <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  v-model="email"
                  type="email"
                  placeholder="name@example.com"
                  :class="['form-input', { 'has-error': errors.email }]"
                />
                <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  v-model="subject"
                  type="text"
                  placeholder="e.g. Feedback on Himalayan Itineraries"
                  :class="['form-input', { 'has-error': errors.subject }]"
                />
                <span v-if="errors.subject" class="error-msg">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">Your Message *</label>
                <textarea
                  id="contact-message"
                  v-model="message"
                  rows="5"
                  placeholder="Write your note, feedback, or inquiry..."
                  :class="['form-textarea', { 'has-error': errors.message }]"
                />
                <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
              </div>

              <button type="submit" class="btn btn-primary btn-lg submit-btn">
                <Send :size="16" />
                <span>Submit Message</span>
              </button>
            </form>
          </div>

          <!-- Success State -->
          <div v-else class="success-box">
            <CheckCircle2 :size="48" class="success-icon" />
            <h3>Thank You, {{ name }}!</h3>
            <p>
              Your demo message has been received and saved locally in your browser session. Thank you for testing TripNest!
            </p>
            <button type="button" class="btn btn-outline" @click="resetForm">
              Send Another Note
            </button>
          </div>
        </div>

        <!-- Right: FAQ Accordion -->
        <div class="faq-column">
          <div class="faq-header">
            <span class="text-eyebrow">COMMON QUESTIONS</span>
            <h2>Frequently Asked Questions</h2>
            <p>Helpful answers regarding itineraries, local storage, and planning features.</p>
          </div>

          <div class="faq-list">
            <AccordionItem
              v-for="(faq, idx) in faqs"
              :key="faq.question"
              :title="faq.question"
              :initially-open="idx === 0"
            >
              <p>{{ faq.answer }}</p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.contact-view {
  min-height: 85vh;
  padding-bottom: 5rem;
}

.contact-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.hero-inner {
  max-width: 680px;
}

.page-title {
  margin-top: 0.4rem;
  margin-bottom: 0.6rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3.5rem;
  align-items: flex-start;
}

.form-card {
  padding: 2.25rem;
}

.form-title {
  font-size: 1.6rem;
  margin-bottom: 0.35rem;
}

.form-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}

.has-error {
  border-color: var(--color-danger) !important;
}

.error-msg {
  font-size: 0.78rem;
  color: var(--color-danger);
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;
}

.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
}

.success-icon {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.success-box h3 {
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
}

.success-box p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 380px;
}

.faq-header h2 {
  font-size: 1.8rem;
  margin-top: 0.35rem;
  margin-bottom: 0.5rem;
}

.faq-header p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.75rem;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .contact-view {
    padding-bottom: 2.5rem;
  }

  .contact-hero {
    padding: 2.5rem 0 1.75rem;
    margin-bottom: 1.75rem;
  }

  .form-card {
    padding: 1.5rem 1.15rem;
  }
}
</style>
