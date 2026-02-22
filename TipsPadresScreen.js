import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from './colors';

// Datos simulados de consejos para padres.
// Cada tarjeta incluye un título, icono y descripción breve.
const CONSEJOS_PADRES = [
  {
    id: 'cepillado',
    icono: '🪥',
    titulo: 'Técnica de cepillado',
    descripcion:
      'Usa movimientos circulares suaves por 2 minutos, cubriendo frente, parte interna y zona de masticación. Supervisa hasta que el niño tenga buena coordinación.',
  },
  {
    id: 'alimentacion',
    icono: '🍎',
    titulo: 'Alimentación saludable',
    descripcion:
      'Prioriza agua, frutas y verduras. Limita dulces pegajosos y refrescos para reducir el riesgo de caries y proteger el esmalte de los dientes.',
  },
  {
    id: 'dentista',
    icono: '🦷',
    titulo: 'Visitas al dentista',
    descripcion:
      'Programa controles cada 6 meses. Las revisiones preventivas ayudan a detectar problemas temprano y refuerzan hábitos positivos de higiene.',
  },
  {
    id: 'hilo-dental',
    icono: '🧵',
    titulo: 'Uso de hilo dental',
    descripcion:
      'Cuando los dientes ya están juntos, usa hilo dental una vez al día con cuidado para limpiar entre dientes donde el cepillo no alcanza.',
  },
];

const TipsPadresScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado principal con un estilo limpio y amigable */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Tips para Padres</Text>
        <Text style={styles.headerSubtitle}>Consejos prácticos para una higiene bucal infantil saludable.</Text>
      </View>

      {/* Contenedor scrollable para permitir leer todas las tarjetas */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {CONSEJOS_PADRES.map((tip) => (
          // Tarjeta individual de consejo en diseño pastel y limpio.
          <View key={tip.id} style={styles.tipCard}>
            <View style={styles.tipTopRow}>
              <Text style={styles.tipIcon}>{tip.icono}</Text>
              <Text style={styles.tipTitle}>{tip.titulo}</Text>
            </View>
            <Text style={styles.tipDescription}>{tip.descripcion}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8EFF6',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: '#5F6670',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 10,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EAF2F7',
  },
  tipTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    flexShrink: 1,
  },
  tipDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4E5661',
    fontWeight: '500',
  },
});

export default TipsPadresScreen;
