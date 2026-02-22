import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './colors';

const InicioScreen = () => {
  // Estado de ejemplo para mostrar el progreso diario de cepillado.
  const progresoHoy = 70;

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado con saludo amigable para niños */}
      <View style={styles.headerCard}>
        <Text style={styles.greeting}>¡Hola, súper sonrisa! 😄</Text>
        <Text style={styles.subtitle}>Hoy cuidaremos tus dientes juntos.</Text>
      </View>

      {/* Botón principal grande para iniciar el cepillado */}
      <TouchableOpacity style={styles.brushButton} activeOpacity={0.9}>
        <Text style={styles.brushButtonText}>Cepillar ahora</Text>
      </TouchableOpacity>

      {/* Tarjeta con el progreso del día */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Progreso del día</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progresoHoy}%` }]} />
        </View>
        <Text style={styles.progressValue}>{progresoHoy}% completado</Text>
      </View>

      {/* Navegación rápida a secciones importantes de la app */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, styles.missionButton]} activeOpacity={0.9}>
          <Text style={styles.actionText}>Misiones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.calendarButton]} activeOpacity={0.9}>
          <Text style={styles.actionText}>Calendario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.rewardButton]} activeOpacity={0.9}>
          <Text style={styles.actionText}>Recompensas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#656565',
  },
  brushButton: {
    backgroundColor: Colors.primary,
    borderRadius: 26,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  brushButtonText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#13405F',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  progressTrack: {
    width: '100%',
    height: 16,
    borderRadius: 99,
    backgroundColor: '#E6EEF5',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 99,
  },
  progressValue: {
    marginTop: 10,
    fontSize: 15,
    color: '#4F4F4F',
    fontWeight: '600',
  },
  quickActions: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  missionButton: {
    backgroundColor: Colors.accent,
  },
  calendarButton: {
    backgroundColor: Colors.primary,
  },
  rewardButton: {
    backgroundColor: Colors.reward,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
});

export default InicioScreen;
