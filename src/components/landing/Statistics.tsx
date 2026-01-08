// src/components/landing/Statistics.tsx

'use client'

import { useEffect, useState } from 'react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [end])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return (
    <span id={`counter-${end}`}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function Statistics() {
  const stats = [
    {
      value: 36,
      label: 'States Covered',
      description: 'Comprehensive coverage across Nigeria'
    },
    {
      value: 8,
      label: 'Average Response Time',
      description: 'Swift emergency response',
      prefix: '<',
      suffix: 'min'
    },
    {
      value: 500,
      label: 'Officers Deployed',
      description: 'Trained response teams nationwide',
      suffix: '+'
    },
    {
      value: 24,
      label: 'Active Monitoring',
      description: 'Round-the-clock surveillance',
      suffix: '/7'
    }
  ]

  return (
    <section className="py-16 bg-fmld-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Protecting Nigeria with Proven Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach to livestock security has delivered measurable impact across the nation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl md:text-5xl font-bold text-fmld-green mb-2">
                <Counter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-fmld-green mb-2">
              <Counter end={89} suffix="%" />
            </div>
            <div className="text-base font-semibold text-gray-900 mb-1">
              Success Rate
            </div>
            <div className="text-sm text-gray-600">
              Incidents resolved successfully
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fmld-green mb-2">
              <Counter end={12} />
            </div>
            <div className="text-base font-semibold text-gray-900 mb-1">
              Languages Supported
            </div>
            <div className="text-sm text-gray-600">
              Local language integration
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fmld-green mb-2">
              <Counter end={95} suffix="%" />
            </div>
            <div className="text-base font-semibold text-gray-900 mb-1">
              Uptime Guarantee
            </div>
            <div className="text-sm text-gray-600">
              Always available when needed
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}