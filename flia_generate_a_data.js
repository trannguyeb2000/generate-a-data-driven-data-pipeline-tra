class DataPipelineTracker {
  constructor(pipelineName) {
    this.pipelineName = pipelineName;
    this.pipelineData = {};
    this.pipelineEvents = [];
  }

  addChildPipeline(childPipeline) {
    this.pipelineData[childPipeline.pipelineName] = childPipeline;
  }

  addEvent(eventName, eventData) {
    this.pipelineEvents.push({ eventName, eventData });
  }

  generateTrackingData() {
    const trackingData = {
      pipelineName: this.pipelineName,
      events: this.pipelineEvents,
      childPipelines: Object.values(this.pipelineData),
    };

    return trackingData;
  }
}

class PipelineEvent {
  constructor(eventName, eventData) {
    this.eventName = eventName;
    this.eventData = eventData;
  }
}

// Example usage:
const pipeline = new DataPipelineTracker('Main Pipeline');
const childPipeline1 = new DataPipelineTracker('Child Pipeline 1');
const childPipeline2 = new DataPipelineTracker('Child Pipeline 2');

pipeline.addChildPipeline(childPipeline1);
pipeline.addChildPipeline(childPipeline2);

pipeline.addEvent('Data Ingestion', { timestamp: new Date(), data: 'Some data' });
pipeline.addEvent('Data Processing', { timestamp: new Date(), data: 'Processed data' });

childPipeline1.addEvent('Data Transformation', { timestamp: new Date(), data: 'Transformed data' });
childPipeline2.addEvent('Data Storage', { timestamp: new Date(), data: 'Stored data' });

const trackingData = pipeline.generateTrackingData();
console.log(trackingData);