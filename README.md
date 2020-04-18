# node-red-contrib-spc

Calculates SPC (statistical process control) statistics about input data. This node uses the [Simple Statistics](http://simplestatistics.org) Node library.

## Inputs

The input expects an array of objects with a datetime and one to many number fields.

The data is grouped in buckets. 

The entries in the data array are limited to the Bucket Count property with the oldest elements dropped first.

## Outputs

The following functions are supported:

- mean
- standardDeviation
- Upper and Lower limit based on the sample size (bucket length) for mean and standardDeviation 
