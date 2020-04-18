/**
 * Copyright 2020 Martin Doyle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
'use strict';
module.exports = function (RED) {
  const statistics = require('simple-statistics');
  const spcConsts = [
    { n: 2, d2: 1.1284, d3: 0.8525, c4: 0.7979, A2: 1.88, A3: 2.659, D3: 0, D4: 3.2665, B3: 0, B4: 3.2665 },
    { n: 3, d2: 1.6926, d3: 0.8884, c4: 0.8862, A2: 1.0233, A3: 1.954, D3: 0, D4: 2.5746, B3: 0, B4: 2.5682 },
    { n: 4, d2: 2.0588, d3: 0.8798, c4: 0.9213, A2: 0.7286, A3: 1.628, D3: 0, D4: 2.2821, B3: 0, B4: 2.266 },
    { n: 5, d2: 2.3259, d3: 0.8641, c4: 0.94, A2: 0.5768, A3: 1.427, D3: 0, D4: 2.1145, B3: 0, B4: 2.089 },
    { n: 6, d2: 2.5344, d3: 0.848, c4: 0.9515, A2: 0.4832, A3: 1.287, D3: 0, D4: 2.0038, B3: 0.0304, B4: 1.9696 },
    { n: 7, d2: 2.7044, d3: 0.8332, c4: 0.9594, A2: 0.4193, A3: 1.182, D3: 0.0757, D4: 1.9243, B3: 0.1177, B4: 1.8823 },
    { n: 8, d2: 2.8472, d3: 0.8198, c4: 0.965, A2: 0.3725, A3: 1.099, D3: 0.1362, D4: 1.8638, B3: 0.1851, B4: 1.8149 },
    { n: 9, d2: 2.97, d3: 0.8078, c4: 0.9693, A2: 0.3367, A3: 1.032, D3: 0.184, D4: 1.816, B3: 0.2391, B4: 1.7609 },
    { n: 10, d2: 3.0775, d3: 0.7971, c4: 0.9727, A2: 0.3083, A3: 0.975, D3: 0.223, D4: 1.777, B3: 0.2837, B4: 1.7163 },
    { n: 11, d2: 3.1729, d3: 0.7873, c4: 0.9754, A2: 0.2851, A3: 0.927, D3: 0.2556, D4: 1.7444, B3: 0.3213, B4: 1.6787 },
    { n: 12, d2: 3.2585, d3: 0.7785, c4: 0.9776, A2: 0.2658, A3: 0.886, D3: 0.2833, D4: 1.7167, B3: 0.3535, B4: 1.6465 },
    { n: 13, d2: 3.336, d3: 0.7704, c4: 0.9794, A2: 0.2494, A3: 0.85, D3: 0.3072, D4: 1.6928, B3: 0.3816, B4: 1.6184 },
    { n: 14, d2: 3.4068, d3: 0.763, c4: 0.981, A2: 0.2354, A3: 0.817, D3: 0.3281, D4: 1.6719, B3: 0.4062, B4: 1.5938 },
    { n: 15, d2: 3.4718, d3: 0.7562, c4: 0.9823, A2: 0.2231, A3: 0.789, D3: 0.3466, D4: 1.6534, B3: 0.4282, B4: 1.5718 },
    { n: 16, d2: 3.532, d3: 0.7499, c4: 0.9835, A2: 0.2123, A3: 0.763, D3: 0.363, D4: 1.637, B3: 0.4479, B4: 1.5521 },
    { n: 17, d2: 3.5879, d3: 0.7441, c4: 0.9845, A2: 0.2028, A3: 0.739, D3: 0.3779, D4: 1.6221, B3: 0.4657, B4: 1.5343 },
    { n: 18, d2: 3.6401, d3: 0.7386, c4: 0.9854, A2: 0.1943, A3: 0.718, D3: 0.3913, D4: 1.6087, B3: 0.4818, B4: 1.5182 },
    { n: 19, d2: 3.689, d3: 0.7335, c4: 0.9862, A2: 0.1866, A3: 0.698, D3: 0.4035, D4: 1.5965, B3: 0.4966, B4: 1.5034 },
    { n: 20, d2: 3.7349, d3: 0.7287, c4: 0.9869, A2: 0.1796, A3: 0.68, D3: 0.4147, D4: 1.5853, B3: 0.5102, B4: 1.4898 },
    { n: 21, d2: 3.7783, d3: 0.7242, c4: 0.9876, A2: 0.1733, A3: 0.663, D3: 0.425, D4: 1.575, B3: 0.5228, B4: 1.4772 },
    { n: 22, d2: 3.8194, d3: 0.7199, c4: 0.9882, A2: 0.1675, A3: 0.647, D3: 0.4345, D4: 1.5655, B3: 0.5344, B4: 1.4656 },
    { n: 23, d2: 3.8583, d3: 0.7159, c4: 0.9887, A2: 0.1621, A3: 0.633, D3: 0.4434, D4: 1.5566, B3: 0.5452, B4: 1.4548 },
    { n: 24, d2: 3.8953, d3: 0.7121, c4: 0.9892, A2: 0.1572, A3: 0.619, D3: 0.4516, D4: 1.5484, B3: 0.5553, B4: 1.4447 },
    { n: 25, d2: 3.9306, d3: 0.7084, c4: 0.9896, A2: 0.1526, A3: 0.606, D3: 0.4593, D4: 1.5407, B3: 0.5648, B4: 1.4352 }
  ];

  function SpcNode (config) {
    RED.nodes.createNode(this, config);

    const node = this;

    node.columns = (config.columns || '').split(',');
    node.bucketCount = ((config.bucketCount !== undefined) ? config.bucketCount : 50) * 1;
    if (node.bucketCount < 1) node.bucketCount = 50;
    node.keyField = config.keyField;
    node.typeField = config.typeField;
    node.groupField = config.groupField;

    // Using simple statistics
    const buckets = [];
    const summary = {};
    summary.bucketCount = 0;
    summary.bucketSize = 0;
    let lastBucketSize = 0;
    let spcConst;

    this.on('input', function (msg) {
      const value = msg.payload;
      if (value !== undefined) {
        if (Array.isArray(value)) {
          const newDate = new Date().toISOString();
          const valueLength = value.length;
          // For is supposed to be faster than map
          for (let i = 0; i < valueLength; i++) {
            value[i].summaryKey = newDate;
          }
          const item = {};
          item.key = newDate;
          item.count = valueLength;
          summary.bucketCount++;
          summary.bucketSize = statistics.max([item.count, summary.bucketSize]);
          node.columns.forEach(function (v) {
            item[v] = {};
            const vector = value.map(function (x, i) {
              return x[v];
            });
            item[v].sum = statistics.sum(vector);
            item[v].avg = item[v].sum / item.count;
            item[v].sumOfSq = statistics.sampleVariance(vector);
            item[v].std = Math.sqrt(item[v].sumOfSq);
            if (!summary[v]) {
              summary[v] = {};
              summary[v].avgSum = 0.0;
              summary[v].stdSum = 0.0;
            }
            summary[v].avgSum += item[v].avg;
            summary[v].stdSum += item[v].std;
          });
          buckets.push(item);
          let bucketLength = buckets.length;
          while (bucketLength > node.bucketCount) {
            summary.bucketCount--;
            node.columns.forEach(function (v) {
              summary[v].avgSum -= buckets[0][v].avg;
              summary[v].stdSum -= buckets[0][v].std;
            });
            buckets.shift();
            bucketLength--;
          }

          if ((lastBucketSize === 0) || (summary.bucketSize !== lastBucketSize)) {
            spcConst = spcConsts.find(function (v) {
              lastBucketSize = summary.bucketSize;
              return v.n === summary.bucketSize;
            });
          }
          node.columns.forEach(function (v) {
            summary[v].avgXBar = summary[v].avgSum / summary.bucketCount;
            summary[v].stdXBar = summary[v].stdSum / summary.bucketCount;
            summary[v].stdXBar6 = summary[v].stdXBar * 6;
            summary[v].avgUpperLimit = summary[v].avgXBar + spcConst.A3 * summary[v].stdXBar;
            summary[v].avgLowerLimit = summary[v].avgXBar - spcConst.A3 * summary[v].stdXBar;
            summary[v].stdUpperLimit = spcConst.B4 * summary[v].stdXBar;
            summary[v].stdLowerLimit = spcConst.B3 * summary[v].stdXBar;
          });
          // msg.buckets = buckets;
          msg.summary = summary;
          node.send(RED.util.cloneMessage(msg));
        }
      }
    });
  }
  RED.nodes.registerType('spc', SpcNode);
};
