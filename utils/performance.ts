/**
 * Performance Monitoring Utilities for Birthday Photobooth
 * Created by AI Assistant
 */

import React from 'react';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  timestamp: number;
  component?: string;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetrics[] = [];
  
  /**
   * Start performance measurement
   */
  static startMeasure(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  }
  
  /**
   * End performance measurement and record metrics
   */
  static endMeasure(name: string, component?: string): PerformanceMetrics | null {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = window.performance.getEntriesByName(name, 'measure')[0];
      const memory = (window.performance as any).memory;
      
      const metrics: PerformanceMetrics = {
        renderTime: measure?.duration || 0,
        memoryUsage: memory?.usedJSHeapSize || 0,
        timestamp: Date.now(),
        component
      };
      
      this.metrics.push(metrics);
      
      // Keep only last 100 measurements
      if (this.metrics.length > 100) {
        this.metrics = this.metrics.slice(-100);
      }
      
      return metrics;
    }
    return null;
  }
  
  /**
   * Get performance report
   */
  static getReport(): {
    averageRenderTime: number;
    maxRenderTime: number;
    minRenderTime: number;
    totalMeasurements: number;
    currentMemoryUsage: number;
  } {
    if (this.metrics.length === 0) {
      return {
        averageRenderTime: 0,
        maxRenderTime: 0,
        minRenderTime: 0,
        totalMeasurements: 0,
        currentMemoryUsage: 0
      };
    }
    
    const renderTimes = this.metrics.map(m => m.renderTime);
    
    return {
      averageRenderTime: renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length,
      maxRenderTime: Math.max(...renderTimes),
      minRenderTime: Math.min(...renderTimes),
      totalMeasurements: this.metrics.length,
      currentMemoryUsage: this.metrics[this.metrics.length - 1]?.memoryUsage || 0
    };
  }
  
  /**
   * Clear all metrics
   */
  static clearMetrics(): void {
    this.metrics = [];
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks();
      window.performance.clearMeasures();
    }
  }
  
  /**
   * Log performance report to console (development only)
   */
  static logReport(): void {
    if (typeof window !== 'undefined' && (import.meta as any).env?.DEV) {
      const report = this.getReport();
      console.group('🚀 Birthday Photobooth Performance Report');
      console.log('📊 Average Render Time:', `${report.averageRenderTime.toFixed(2)}ms`);
      console.log('⏱️ Max Render Time:', `${report.maxRenderTime.toFixed(2)}ms`);
      console.log('⚡ Min Render Time:', `${report.minRenderTime.toFixed(2)}ms`);
      console.log('📈 Total Measurements:', report.totalMeasurements);
      console.log('🧠 Current Memory Usage:', `${(report.currentMemoryUsage / 1048576).toFixed(2)}MB`);
      console.groupEnd();
    }
  }
}

/**
 * React Hook for component performance monitoring
 */
export function usePerformanceMonitor(componentName: string) {
  const startMeasure = () => PerformanceMonitor.startMeasure(componentName);
  const endMeasure = () => PerformanceMonitor.endMeasure(componentName, componentName);
  
  return { startMeasure, endMeasure };
}

/**
 * Higher-order component for automatic performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const MonitoredComponent = (props: P) => {
    React.useEffect(() => {
      PerformanceMonitor.startMeasure(displayName);
      return () => {
        PerformanceMonitor.endMeasure(displayName, displayName);
      };
    });
    
    return React.createElement(WrappedComponent, props);
  };
  
  MonitoredComponent.displayName = `withPerformanceMonitoring(${displayName})`;
  
  return MonitoredComponent;
}
