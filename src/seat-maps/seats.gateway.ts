import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SeatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private selectedSeats: string[] = []; // List of selected seats
  private userSeats: Map<string, string[]> = new Map(); // Track selected seats per user

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Send the current selected seats to the newly connected client
    client.emit('initialSeats', this.selectedSeats);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Clean up user seat selections when they disconnect
    this.userSeats.delete(client.id);
  }

  @SubscribeMessage('selectSeat')
  handleSelectSeat(client: Socket, seatLabel: string) {
    console.log(`client: ${client.id}`);
    console.log('seatLabel', seatLabel);
    // Ensure the seat is not already selected by someone else
    if (!this.selectedSeats.includes(seatLabel)) {
      // Add the seat to the selected seats
      this.selectedSeats.push(seatLabel);

      // Update the user's selected seats
      const userSeats = this.userSeats.get(client.id) || [];
      this.userSeats.set(client.id, [...userSeats, seatLabel]);

      // Broadcast the selected seat to all clients
      this.server.emit('seatSelected', { seatLabel, userId: client.id });

      // Notify the user about their selected seat
      client.emit('userSeatSelected', seatLabel);
    }
  }

  @SubscribeMessage('unselectSeat')
  handleUnselectSeat(client: Socket, seatLabel: string) {
    // Remove the seat from the selected seats
    this.selectedSeats = this.selectedSeats.filter(
      (seat) => seat !== seatLabel,
    );

    // Remove the seat from the user's selected seats
    const userSeats = this.userSeats.get(client.id) || [];
    this.userSeats.set(
      client.id,
      userSeats.filter((seat) => seat !== seatLabel),
    );

    // Broadcast the unselected seat to all clients
    this.server.emit('seatUnselected', { seatLabel, userId: client.id });
  }
}

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import Redis from 'ioredis';

// @WebSocketGateway({ cors: true })
// export class SeatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   private redisClient: Redis;
//   private readonly SEAT_EXPIRATION_TIME = 600; // Time in seconds (e.g., 10 minutes)

//   constructor() {
//     this.redisClient = new Redis(); // Connect to Redis server

//     // Optional: Add Redis connection event listeners for better visibility
//     this.redisClient.on('connect', () => {
//       console.log('Connected to Redis');
//     });

//     this.redisClient.on('error', (err) => {
//       console.error('Redis connection error:', err);
//     });
//   }

//   async handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     try {
//       // Fetch and emit currently selected seats when a new client connects
//       const seats = await this.redisClient.lrange('selectedSeats', 0, -1);
//       client.emit('initialSeats', seats);
//     } catch (err) {
//       console.error('Error fetching initial seats:', err);
//     }
//   }

//   async handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     try {
//       // Fetch seats selected by this user
//       const userSeats = await this.redisClient.smembers(`user:${client.id}`);
//       // Remove user's selected seats from the global list
//       for (const seat of userSeats) {
//         await this.redisClient.lrem('selectedSeats', 0, seat);
//       }
//       // Clean up user-specific Redis key
//       await this.redisClient.del(`user:${client.id}`);
//     } catch (err) {
//       console.error('Error during disconnect cleanup:', err);
//     }
//   }

//   @SubscribeMessage('selectSeat')
//   async handleSelectSeat(client: Socket, seatLabel: string) {
//     console.log(`Client ${client.id} selecting seat: ${seatLabel}`);
//     try {
//       // Check if the seat is already selected
//       const seatExists = await this.redisClient.lpos(
//         'selectedSeats',
//         seatLabel,
//       );

//       if (seatExists === null) {
//         // Add the seat to the list of selected seats
//         await this.redisClient.rpush('selectedSeats', seatLabel);
//         // Track seat selection under the user's key
//         await this.redisClient.sadd(`user:${client.id}`, seatLabel);

//         // Optionally, set an expiration time for the user's seat selections
//         await this.redisClient.expire(
//           `user:${client.id}`,
//           this.SEAT_EXPIRATION_TIME,
//         );

//         // Notify clients about the seat selection
//         this.server.emit('seatSelected', { seatLabel, userId: client.id });
//         client.emit('userSeatSelected', seatLabel);
//       }
//     } catch (err) {
//       console.error('Error handling seat selection:', err);
//       client.emit('error', 'Failed to select seat. Please try again.');
//     }
//   }

//   @SubscribeMessage('unselectSeat')
//   async handleUnselectSeat(client: Socket, seatLabel: string) {
//     console.log(`Client ${client.id} unselecting seat: ${seatLabel}`);
//     try {
//       // Remove the seat from the list of selected seats
//       await this.redisClient.lrem('selectedSeats', 0, seatLabel);
//       // Remove seat tracking under the user's key
//       await this.redisClient.srem(`user:${client.id}`, seatLabel);

//       // Notify clients about the seat unselection
//       this.server.emit('seatUnselected', { seatLabel, userId: client.id });
//     } catch (err) {
//       console.error('Error handling seat unselection:', err);
//       client.emit('error', 'Failed to unselect seat. Please try again.');
//     }
//   }
// }
