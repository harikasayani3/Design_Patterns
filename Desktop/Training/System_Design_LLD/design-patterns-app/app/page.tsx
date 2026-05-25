
'use client'

import { useState } from 'react'

/* =========================
   SINGLETON PATTERN
========================= */

class Database {
  private static instance: Database

  private constructor() {}

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

  connect() {
    return 'Connected to Single Database Instance'
  }
}

/* =========================
   FACTORY PATTERN
========================= */

class NotificationFactory {
  static createNotification(type: string) {
    switch (type) {
      case 'email':
        return '📧 Email Notification Created'

      case 'sms':
        return '📱 SMS Notification Created'

      case 'push':
        return '🔔 Push Notification Created'

      default:
        return 'Unknown Notification'
    }
  }
}

/* =========================
   BUILDER PATTERN
========================= */

class UserBuilder {
  private user: any = {}

  setName(name: string) {
    this.user.name = name
    return this
  }

  setRole(role: string) {
    this.user.role = role
    return this
  }

  setCountry(country: string) {
    this.user.country = country
    return this
  }

  build() {
    return this.user
  }
}

/* =========================
   ADAPTER PATTERN
========================= */

class Razorpay {
  makePayment(value: number) {
    return `Paid ₹${value} using Razorpay`
  }
}

class RazorpayAdapter {
  private razorpay: Razorpay

  constructor() {
    this.razorpay = new Razorpay()
  }

  pay(amount: number) {
    return this.razorpay.makePayment(amount)
  }
}

/* =========================
   DECORATOR PATTERN
========================= */

class Coffee {
  cost() {
    return 100
  }
}

class MilkDecorator {
  private coffee: Coffee

  constructor(coffee: Coffee) {
    this.coffee = coffee
  }

  cost() {
    return this.coffee.cost() + 20
  }
}

class ChocolateDecorator {
  private coffee: Coffee

  constructor(coffee: Coffee) {
    this.coffee = coffee
  }

  cost() {
    return this.coffee.cost() + 30
  }
}

/* =========================
   STRATEGY PATTERN
========================= */

interface PaymentStrategy {
  pay(amount: number): string
}

class UPIPayment implements PaymentStrategy {
  pay(amount: number) {
    return `Paid ₹${amount} using UPI`
  }
}

class CardPayment implements PaymentStrategy {
  pay(amount: number) {
    return `Paid ₹${amount} using Credit Card`
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    return `Paid ₹${amount} using PayPal`
  }
}

class ShoppingCart {
  private strategy!: PaymentStrategy

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy
  }

  checkout(amount: number) {
    return this.strategy.pay(amount)
  }
}

/* =========================
   OBSERVER PATTERN
========================= */

class Subscriber {
  name: string

  constructor(name: string) {
    this.name = name
  }

  update(message: string) {
    return `${this.name} received: ${message}`
  }
}

class YouTubeChannel {
  private subscribers: Subscriber[] = []

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber)
  }

  notify(video: string) {
    return this.subscribers.map((subscriber) =>
      subscriber.update(video)
    )
  }
}

export default function Home() {
  const [dbMessage, setDbMessage] = useState('')
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState<any>(null)
  const [adapterMessage, setAdapterMessage] = useState('')
  const [coffeeCost, setCoffeeCost] = useState(100)
  const [paymentMessage, setPaymentMessage] = useState('')
  const [notifications, setNotifications] = useState<string[]>([])

  const connectDatabase = () => {
    const db = Database.getInstance()
    setDbMessage(db.connect())
  }

  const createNotification = (type: string) => {
    const result = NotificationFactory.createNotification(type)
    setNotification(result)
  }

  const buildUser = () => {
    const newUser = new UserBuilder()
      .setName('Harika')
      .setRole('Admin')
      .setCountry('India')
      .build()

    setUser(newUser)
  }

  const processPayment = () => {
    const adapter = new RazorpayAdapter()
    setAdapterMessage(adapter.pay(500))
  }

  const addMilk = () => {
    const coffee = new Coffee()
    const milkCoffee = new MilkDecorator(coffee)
    setCoffeeCost(milkCoffee.cost())
  }

  const addChocolate = () => {
    const coffee = new Coffee()
    const milkCoffee = new MilkDecorator(coffee)
    const chocolateCoffee =
      new ChocolateDecorator(milkCoffee)

    setCoffeeCost(chocolateCoffee.cost())
  }

  const makePayment = (type: string) => {
    const cart = new ShoppingCart()

    if (type === 'upi') {
      cart.setStrategy(new UPIPayment())
    }

    if (type === 'card') {
      cart.setStrategy(new CardPayment())
    }

    if (type === 'paypal') {
      cart.setStrategy(new PayPalPayment())
    }

    const result = cart.checkout(500)

    setPaymentMessage(result)
  }

  const uploadVideo = () => {
    const channel = new YouTubeChannel()

    const harika = new Subscriber('Harika')
    const harini = new Subscriber('Harini')
    const bindu = new Subscriber('Bindu')

    channel.subscribe(harika)
    channel.subscribe(harini)
    channel.subscribe(bindu)

    const result = channel.notify(
      'New React Tutorial Uploaded'
    )

    setNotifications(result)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">
          Complete Design Patterns Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          /*----------Singleton Pattern-------------*/
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Singleton Pattern
            </h2>

            <button
              onClick={connectDatabase}
              className="bg-black text-white px-4 py-2 rounded-xl w-full"
            >
              Connect Database
            </button>

            <div className="mt-4 font-semibold">
              {dbMessage}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            /*-----------Factory Pattern */
            <h2 className="text-2xl font-bold mb-4">
              Factory Pattern
            </h2>

            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => createNotification('email')}
                className="bg-blue-500 text-white px-3 py-2 rounded-xl"
              >
                Email
              </button>

              <button
                onClick={() => createNotification('sms')}
                className="bg-green-500 text-white px-3 py-2 rounded-xl"
              >
                SMS
              </button>

              <button
                onClick={() => createNotification('push')}
                className="bg-purple-500 text-white px-3 py-2 rounded-xl"
              >
                Push
              </button>
            </div>

            <div className="font-semibold">
              {notification}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            /*---------------Builder Pattern ---------------*/
            <h2 className="text-2xl font-bold mb-4">
              Builder Pattern
            </h2>

            <button
              onClick={buildUser}
              className="bg-yellow-500 text-black px-4 py-2 rounded-xl w-full"
            >
              Build User
            </button>

            {user && (
              <div className="mt-4 bg-gray-100 p-4 rounded-xl">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Country:</strong> {user.country}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            /*---------------Adapter Pattern--------------- */
            <h2 className="text-2xl font-bold mb-4">
              Adapter Pattern
            </h2>

            <button
              onClick={processPayment}
              className="bg-green-600 text-white px-4 py-2 rounded-xl w-full"
            >
              Process Razorpay Payment
            </button>

            <div className="mt-4 font-semibold">
              {adapterMessage}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            /*--------------Decorator Pattern ---------------------*/
            <h2 className="text-2xl font-bold mb-4">
              Decorator Pattern
            </h2>

            <div className="bg-gray-100 p-4 rounded-xl mb-4">
              Coffee Cost: ₹{coffeeCost}
            </div>

            <div className="flex gap-3">
              <button
                onClick={addMilk}
                className="bg-yellow-500 text-black px-4 py-2 rounded-xl"
              >
                Add Milk
              </button>

              <button
                onClick={addChocolate}
                className="bg-orange-600 text-white px-4 py-2 rounded-xl"
              >
                Add Chocolate
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            /*-------------Strategy Pattern-------------- */
            <h2 className="text-2xl font-bold mb-4">
              Strategy Pattern
            </h2>

            <div className="flex gap-3 mb-4 flex-wrap">
              <button
                onClick={() => makePayment('upi')}
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
              >
                UPI
              </button>

              <button
                onClick={() => makePayment('card')}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Card
              </button>

              <button
                onClick={() => makePayment('paypal')}
                className="bg-purple-500 text-white px-4 py-2 rounded-xl"
              >
                PayPal
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl font-semibold">
              {paymentMessage}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 lg:col-span-3">
            /*-------------------- Observer Pattern--------------- */
            <h2 className="text-2xl font-bold mb-4">
              Observer Pattern
            </h2>

            <button
              onClick={uploadVideo}
              className="bg-red-500 text-white px-4 py-2 rounded-xl mb-4"
            >
              Upload Video
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {notifications.map((message, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-xl"
                >
                  {message}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
