import { Request, Response } from 'express';

export const getTelemetry = (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  
  // Simulated movement logic
  const baseLat = 6.9271; // Colombo, Sri Lanka base
  const baseLng = 79.8612;
  const time = Date.now();
  
  res.json({
    vehicleId,
    lat: baseLat + Math.sin(time / 10000) * 0.01,
    lng: baseLng + Math.cos(time / 10000) * 0.01,
    speed: Math.floor(Math.abs(Math.sin(time / 5000)) * 120), // 0-120 km/h
    fuel: 75,
    status: "active",
    perimeterIntact: true,
    lastUpdated: new Date().toISOString()
  });
};
