import React from 'react';
import { Moon, Brain, Battery, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Sleep With AI-Powered Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Understand your sleep patterns, improve your rest quality, and wake up feeling refreshed with our advanced sleep analysis technology.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold">
              Start Free Trial
            </button>
            <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 font-semibold">
              Learn More
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Moon, text: "Sleep Tracking" },
              { icon: Brain, text: "AI Analysis" },
              { icon: Battery, text: "Energy Levels" },
              { icon: TrendingUp, text: "Progress Insights" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <feature.icon className="h-8 w-8 text-purple-600 mb-2" />
                <span className="font-medium text-gray-800">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}